import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateServiceDto, UpdateServiceDto } from './dto/service.schema';

@Injectable()
export class ServicesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(userId: string, data: CreateServiceDto) {
    const vendor = await this.prisma.vendorProfile.findUnique({ where: { userId } });
    if (!vendor) throw new NotFoundException('Vendor profile not found');

    const { photos, tags, ...serviceData } = data;

    return this.prisma.vendorService.create({
      data: {
        ...serviceData,
        vendorId: vendor.id,
        photos: JSON.stringify(photos),
        tags: JSON.stringify(tags),
        priceHistory: JSON.stringify([{ price: data.basePrice, changedAt: new Date().toISOString() }]),
      }
    });
  }

  async findAll(filters: { 
    categoryId?: string; 
    city?: string; 
    themeId?: string; 
    minPrice?: number; 
    maxPrice?: number; 
    guests?: number 
  }) {
    const where: any = { 
      isActive: true,
      vendor: { isApproved: true } // Only show services from approved vendors
    };

    if (filters.categoryId) where.categoryId = filters.categoryId;
    if (filters.minPrice !== undefined || filters.maxPrice !== undefined) {
      where.basePrice = {};
      if (filters.minPrice !== undefined) where.basePrice.gte = filters.minPrice;
      if (filters.maxPrice !== undefined) where.basePrice.lte = filters.maxPrice;
    }
    if (filters.guests) {
      where.OR = [
        { maxCapacity: null },
        { maxCapacity: { gte: filters.guests } }
      ];
    }
    if (filters.city || filters.themeId) {
      where.vendor = { ...where.vendor };
      if (filters.city) {
        where.vendor.city = { contains: filters.city };
      }
      if (filters.themeId) {
        where.vendor.themes = { some: { themeId: filters.themeId } };
      }
    }

    return this.prisma.vendorService.findMany({
      where,
      include: {
        vendor: {
          select: {
            businessName: true,
            city: true,
            averageRating: true,
            totalBookings: true,
            isFeatured: true,
          }
        },
        category: { select: { name: true, slug: true } }
      },
      orderBy: [
        { vendor: { isFeatured: 'desc' } }, // Featured vendors first
        { vendor: { averageRating: 'desc' } } // Then highest rated
      ]
    });
  }

  async findOne(id: string) {
    const service = await this.prisma.vendorService.findUnique({
      where: { id },
      include: {
        vendor: {
          include: {
            themes: { include: { theme: true } }
          }
        },
        category: true,
      }
    });

    if (!service) throw new NotFoundException('Service not found');
    return service;
  }

  async update(userId: string, id: string, data: UpdateServiceDto) {
    const vendor = await this.prisma.vendorProfile.findUnique({ where: { userId } });
    if (!vendor) throw new NotFoundException('Vendor profile not found');

    const service = await this.prisma.vendorService.findUnique({ where: { id } });
    if (!service) throw new NotFoundException('Service not found');
    if (service.vendorId !== vendor.id) throw new ForbiddenException('Not authorized to edit this service');

    const updateData: any = { ...data };
    
    // Handle JSON serialization
    if (data.photos) updateData.photos = JSON.stringify(data.photos);
    if (data.tags) updateData.tags = JSON.stringify(data.tags);

    // Track price changes
    if (data.basePrice !== undefined && data.basePrice !== service.basePrice) {
      const history = JSON.parse(service.priceHistory || '[]');
      history.push({ price: data.basePrice, changedAt: new Date().toISOString() });
      updateData.priceHistory = JSON.stringify(history);
    }

    return this.prisma.vendorService.update({
      where: { id },
      data: updateData,
    });
  }

  async remove(userId: string, id: string) {
    const vendor = await this.prisma.vendorProfile.findUnique({ where: { userId } });
    if (!vendor) throw new NotFoundException('Vendor profile not found');

    const service = await this.prisma.vendorService.findUnique({ where: { id } });
    if (!service) throw new NotFoundException('Service not found');
    if (service.vendorId !== vendor.id) throw new ForbiddenException('Not authorized to edit this service');

    // Soft delete / deactivate
    return this.prisma.vendorService.update({
      where: { id },
      data: { isActive: false }
    });
  }
}
