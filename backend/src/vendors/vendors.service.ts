import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterVendorDto, UpdateVendorDto, SetAvailabilityDto } from './dto/vendor.schema';

@Injectable()
export class VendorsService {
  constructor(private readonly prisma: PrismaService) {}

  async register(userId: string, data: RegisterVendorDto) {
    const existing = await this.prisma.vendorProfile.findUnique({ where: { userId } });
    if (existing) {
      throw new BadRequestException('User is already registered as a vendor');
    }

    const { categories, themes, bankAccountDetails, ...profileData } = data;

    // We assume an admin sets this later, but we need a default for creation
    const defaultCommissionRate = 0.10; 

    const vendor = await this.prisma.vendorProfile.create({
      data: {
        ...profileData,
        userId,
        commissionRate: defaultCommissionRate,
        bankAccountDetails: bankAccountDetails ? JSON.stringify(bankAccountDetails) : null,
        categories: {
          create: categories.map(categoryId => ({
            category: { connect: { id: categoryId } },
            isPrimary: true // Simple logic for MVP
          }))
        },
        themes: {
          create: themes.map(themeId => ({
            theme: { connect: { id: themeId } }
          }))
        }
      },
      include: {
        categories: { include: { category: true } },
        themes: { include: { theme: true } },
      }
    });

    // Update user role to VENDOR
    await this.prisma.user.update({
      where: { id: userId },
      data: { role: 'VENDOR' }
    });

    return vendor;
  }

  async getDashboard(userId: string) {
    const vendor = await this.prisma.vendorProfile.findUnique({ where: { userId } });
    if (!vendor) throw new NotFoundException('Vendor profile not found');

    // Basic dashboard stats
    const totalBookings = await this.prisma.booking.count({ where: { vendorId: vendor.id } });
    const earnings = await this.prisma.vendorPayout.aggregate({
      where: { vendorId: vendor.id, status: 'PAID' },
      _sum: { netPayout: true }
    });

    return {
      totalBookings,
      totalEarnings: earnings._sum.netPayout || 0,
      profile: vendor,
    };
  }

  async updateProfile(userId: string, data: UpdateVendorDto) {
    const vendor = await this.prisma.vendorProfile.findUnique({ where: { userId } });
    if (!vendor) throw new NotFoundException('Vendor profile not found');

    return this.prisma.vendorProfile.update({
      where: { id: vendor.id },
      data: {
        ...data,
        bankAccountDetails: data.bankAccountDetails ? JSON.stringify(data.bankAccountDetails) : undefined,
      },
    });
  }

  async setAvailability(userId: string, data: SetAvailabilityDto) {
    const vendor = await this.prisma.vendorProfile.findUnique({ where: { userId } });
    if (!vendor) throw new NotFoundException('Vendor profile not found');

    return this.prisma.vendorAvailability.create({
      data: {
        vendorId: vendor.id,
        isTemplate: data.isTemplate,
        dayOfWeek: data.dayOfWeek,
        date: data.date ? new Date(data.date) : null,
        isBlocked: data.isBlocked,
        slots: JSON.stringify(data.slots),
      }
    });
  }

  async findAll(filters: { city?: string, categoryId?: string }) {
    const where: any = { isApproved: true };
    if (filters.city) {
      where.city = { contains: filters.city };
    }
    if (filters.categoryId) {
      where.categories = { some: { categoryId: filters.categoryId } };
    }

    return this.prisma.vendorProfile.findMany({
      where,
      include: {
        categories: { include: { category: true } },
      },
      orderBy: [
        { isFeatured: 'desc' },
        { averageRating: 'desc' }
      ]
    });
  }

  async findOne(id: string) {
    const vendor = await this.prisma.vendorProfile.findUnique({
      where: { id },
      include: {
        categories: { include: { category: true } },
        themes: { include: { theme: true } },
        services: { where: { isActive: true } },
        reviews: { where: { isVisible: true }, include: { user: { select: { name: true, profilePicUrl: true } } } },
      }
    });

    if (!vendor || !vendor.isApproved) {
      throw new NotFoundException('Vendor not found or not approved');
    }

    return vendor;
  }
}
