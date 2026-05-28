import { Injectable, NotFoundException, BadRequestException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBundleDto, AddBundleItemDto, AddBundleAddOnDto } from './dto/bundle.schema';

@Injectable()
export class BundlesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(userId: string, data: CreateBundleDto) {
    const { items, addOns, ...bundleData } = data;

    // Fetch services to get current prices
    const services = await Promise.all(items.map(async item => {
      const service = await this.prisma.vendorService.findUnique({ 
        where: { id: item.vendorServiceId },
        include: { vendor: true }
      });
      if (!service) throw new BadRequestException(`Service ${item.vendorServiceId} not found`);
      return { ...item, service };
    }));

    // Fetch addons to get current prices
    const addOnItems = await Promise.all(addOns.map(async addon => {
      const item = await this.prisma.addOnCatalogItem.findUnique({ where: { id: addon.addOnItemId } });
      if (!item) throw new BadRequestException(`AddOn ${addon.addOnItemId} not found`);
      return { ...addon, item };
    }));

    let totalAmount = 0;

    const createItems = services.map(({ service, quantity, customNote }) => {
      const unitPrice = service.basePrice;
      totalAmount += unitPrice * quantity;
      
      const priceSnapshot = JSON.stringify({
        title: service.title,
        description: service.description,
        vendorName: service.vendor.businessName,
        basePrice: service.basePrice,
        priceUnit: service.priceUnit,
        photos: JSON.parse(service.photos || '[]')[0] || null
      });

      return {
        vendorServiceId: service.id,
        quantity,
        customNote,
        unitPrice,
        priceSnapshot
      };
    });

    const createAddOns = addOnItems.map(({ item, quantity, customNote }) => {
      const totalPrice = item.price * quantity;
      totalAmount += totalPrice;
      return {
        addOnItemId: item.id,
        quantity,
        totalPrice,
        customNote
      };
    });

    return this.prisma.partyBundle.create({
      data: {
        ...bundleData,
        userId,
        totalAmount,
        status: 'DRAFT',
        items: { create: createItems },
        addOns: { create: createAddOns },
        collaborators: {
          create: [{ userId, role: 'OWNER' }]
        }
      },
      include: {
        items: true,
        addOns: true,
      }
    });
  }

  async findOne(id: string, userId: string) {
    const bundle = await this.prisma.partyBundle.findUnique({
      where: { id },
      include: {
        items: {
          include: { vendorService: { include: { vendor: { select: { businessName: true } } } } }
        },
        addOns: {
          include: { addOnItem: true }
        },
        collaborators: {
          include: { user: { select: { name: true, email: true, profilePicUrl: true } } }
        },
        payment: {
          include: { splits: true }
        }
      }
    });

    if (!bundle) throw new NotFoundException('Bundle not found');
    
    // Auth check: user must be the owner or a collaborator
    if (bundle.userId !== userId && !bundle.collaborators.some(c => c.userId === userId)) {
      throw new ForbiddenException('Not authorized to access this bundle');
    }

    return bundle;
  }

  async addItem(id: string, userId: string, data: AddBundleItemDto) {
    const bundle = await this.findOne(id, userId);
    if (bundle.status !== 'DRAFT') throw new BadRequestException('Cannot add items to a non-draft bundle');

    const service = await this.prisma.vendorService.findUnique({ 
      where: { id: data.vendorServiceId },
      include: { vendor: true }
    });
    if (!service) throw new NotFoundException('Service not found');

    const unitPrice = service.basePrice;
    const itemTotal = unitPrice * data.quantity;

    const priceSnapshot = JSON.stringify({
      title: service.title,
      description: service.description,
      vendorName: service.vendor.businessName,
      basePrice: service.basePrice,
      priceUnit: service.priceUnit,
      photos: JSON.parse(service.photos || '[]')[0] || null
    });

    await this.prisma.bundleItem.create({
      data: {
        bundleId: bundle.id,
        vendorServiceId: service.id,
        quantity: data.quantity,
        customNote: data.customNote,
        unitPrice,
        priceSnapshot
      }
    });

    // Update bundle total
    await this.prisma.partyBundle.update({
      where: { id: bundle.id },
      data: { totalAmount: bundle.totalAmount + itemTotal }
    });

    return this.findOne(id, userId);
  }

  async removeItem(id: string, itemId: string, userId: string) {
    const bundle = await this.findOne(id, userId);
    if (bundle.status !== 'DRAFT') throw new BadRequestException('Cannot modify a non-draft bundle');

    const item = await this.prisma.bundleItem.findUnique({ where: { id: itemId } });
    if (!item || item.bundleId !== id) throw new NotFoundException('Item not found in this bundle');

    const itemTotal = item.unitPrice * item.quantity;

    await this.prisma.bundleItem.delete({ where: { id: itemId } });

    await this.prisma.partyBundle.update({
      where: { id: bundle.id },
      data: { totalAmount: Math.max(0, bundle.totalAmount - itemTotal) }
    });

    return this.findOne(id, userId);
  }

  async addAddOn(id: string, userId: string, data: AddBundleAddOnDto) {
    const bundle = await this.findOne(id, userId);
    if (bundle.status !== 'DRAFT') throw new BadRequestException('Cannot modify a non-draft bundle');

    const addOn = await this.prisma.addOnCatalogItem.findUnique({ where: { id: data.addOnItemId } });
    if (!addOn) throw new NotFoundException('AddOn not found');

    const totalPrice = addOn.price * data.quantity;

    await this.prisma.bundleAddOn.create({
      data: {
        bundleId: bundle.id,
        addOnItemId: addOn.id,
        quantity: data.quantity,
        totalPrice,
        customNote: data.customNote,
      }
    });

    await this.prisma.partyBundle.update({
      where: { id: bundle.id },
      data: { totalAmount: bundle.totalAmount + totalPrice }
    });

    return this.findOne(id, userId);
  }

  async removeAddOn(id: string, addOnId: string, userId: string) {
    const bundle = await this.findOne(id, userId);
    if (bundle.status !== 'DRAFT') throw new BadRequestException('Cannot modify a non-draft bundle');

    const addon = await this.prisma.bundleAddOn.findUnique({ where: { id: addOnId } });
    if (!addon || addon.bundleId !== id) throw new NotFoundException('Addon not found in this bundle');

    await this.prisma.bundleAddOn.delete({ where: { id: addOnId } });

    await this.prisma.partyBundle.update({
      where: { id: bundle.id },
      data: { totalAmount: Math.max(0, bundle.totalAmount - addon.totalPrice) }
    });

    return this.findOne(id, userId);
  }

  async checkout(id: string, userId: string) {
    const bundle = await this.findOne(id, userId);
    if (bundle.status !== 'DRAFT') throw new BadRequestException('Bundle is already checked out or confirmed');
    if (bundle.totalAmount <= 0) throw new BadRequestException('Bundle total amount must be greater than zero');

    // In a real flow, we might re-verify prices here.
    // For now, we assume priceSnapshots in BundleItems are up-to-date since we update total on add/remove.
    // Change status to prevent further edits.
    await this.prisma.partyBundle.update({
      where: { id: bundle.id },
      data: { status: 'CHECKOUT_PENDING' }
    });

    return {
      message: 'Ready for payment',
      bundleId: bundle.id,
      totalAmount: bundle.totalAmount
    };
  }
}
