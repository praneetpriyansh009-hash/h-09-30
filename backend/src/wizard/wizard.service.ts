import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class WizardService {
  constructor(private readonly prisma: PrismaService) {}

  async createSession(userId?: string) {
    const sessionKey = uuidv4();
    // Set expiry to 24 hours from now
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 24);

    return this.prisma.wizardSession.create({
      data: {
        sessionKey,
        userId,
        expiresAt,
        data: '{}',
      }
    });
  }

  async getSession(sessionKey: string) {
    const session = await this.prisma.wizardSession.findUnique({ where: { sessionKey } });
    if (!session) throw new NotFoundException('Session not found or expired');
    return session;
  }

  async updateSession(sessionKey: string, updateData: { currentStep?: number, data?: any }) {
    const session = await this.getSession(sessionKey);
    
    let mergedData = JSON.parse(session.data);
    if (updateData.data) {
      mergedData = { ...mergedData, ...updateData.data };
    }

    // Refresh expiry
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 24);

    return this.prisma.wizardSession.update({
      where: { sessionKey },
      data: {
        currentStep: updateData.currentStep,
        data: JSON.stringify(mergedData),
        expiresAt,
      }
    });
  }

  async deleteSession(sessionKey: string) {
    await this.getSession(sessionKey);
    return this.prisma.wizardSession.delete({ where: { sessionKey } });
  }

  async getThemes(occasionType?: string) {
    const where = occasionType ? { moodKeywords: { contains: occasionType }, isActive: true } : { isActive: true };
    return this.prisma.theme.findMany({ where, orderBy: { sortOrder: 'asc' } });
  }

  async getVenues(filters: any) {
    // Specifically looking for venues (assuming categorySlug 'banquet-halls' or 'villas' or 'restaurants')
    // For MVP, we'll just return vendor services matching the criteria
    const where: any = { isActive: true, vendor: { isApproved: true } };
    
    // In a real app we'd map this explicitly.
    where.category = {
      name: {
        in: ['Restaurants', 'Banquet Halls', 'Villas']
      }
    };

    if (filters.city) {
      where.vendor = { ...where.vendor, city: { contains: filters.city } };
    }
    if (filters.themeId) {
      where.vendor = { ...where.vendor, themes: { some: { themeId: filters.themeId } } };
    }
    if (filters.guests) {
      where.OR = [
        { maxCapacity: null },
        { maxCapacity: { gte: filters.guests } }
      ];
    }
    if (filters.budgetMax) {
      where.basePrice = { lte: filters.budgetMax };
    }

    return this.prisma.vendorService.findMany({
      where,
      include: {
        vendor: { select: { businessName: true, averageRating: true, city: true, isFeatured: true } },
        category: true,
      },
      orderBy: [
        { vendor: { isFeatured: 'desc' } },
        { vendor: { averageRating: 'desc' } }
      ]
    });
  }

  async getAddons(categorySlug?: string) {
    const where = categorySlug ? { categorySlug, isActive: true } : { isActive: true };
    return this.prisma.addOnCatalogItem.findMany({ where, orderBy: { sortOrder: 'asc' } });
  }

  async getTransport(city?: string) {
    const where: any = { 
      isActive: true, 
      category: { name: 'Cabs' },
      vendor: { isApproved: true }
    };
    
    if (city) {
      where.vendor.city = { contains: city };
    }

    return this.prisma.vendorService.findMany({
      where,
      include: {
        vendor: { select: { businessName: true, averageRating: true, city: true } }
      }
    });
  }
}
