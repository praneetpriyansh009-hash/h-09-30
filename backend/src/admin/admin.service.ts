import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AdminService {
  constructor(private readonly prisma: PrismaService) {}

  async getPendingVendors() {
    return this.prisma.vendorProfile.findMany({
      where: { isApproved: false },
      include: {
        user: { select: { name: true, email: true } },
        categories: { include: { category: true } }
      }
    });
  }

  async approveVendor(id: string, adminId: string) {
    await this.logAction(adminId, 'APPROVE_VENDOR', 'VendorProfile', id);

    return this.prisma.vendorProfile.update({
      where: { id },
      data: { isApproved: true }
    });
  }

  async rejectVendor(id: string, adminId: string) {
    await this.logAction(adminId, 'REJECT_VENDOR', 'VendorProfile', id);

    return this.prisma.vendorProfile.update({
      where: { id },
      data: { isApproved: false }
    });
  }

  async setCommission(id: string, rate: number, adminId: string) {
    await this.logAction(adminId, 'SET_COMMISSION', 'VendorProfile', id);

    return this.prisma.vendorProfile.update({
      where: { id },
      data: { commissionRate: rate }
    });
  }

  async getRevenueStats() {
    const bookings = await this.prisma.booking.aggregate({
      where: { status: { in: ['CONFIRMED', 'COMPLETED'] } },
      _sum: { totalAmount: true, commissionAmount: true, vendorEarning: true }
    });

    return {
      totalGmv: bookings._sum.totalAmount || 0,
      platformRevenue: bookings._sum.commissionAmount || 0,
      vendorEarnings: bookings._sum.vendorEarning || 0,
    };
  }

  async getAuditLogs(page = 1, limit = 50) {
    // AuditLog has no `user` relation — just return raw rows.
    return this.prisma.auditLog.findMany({
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { createdAt: 'desc' },
    });
  }

  // Schema: actorId, actorRole, action, entityType, entityId
  private async logAction(actorId: string, action: string, entityType: string, entityId: string) {
    await this.prisma.auditLog.create({
      data: {
        actorId,
        actorRole: 'ADMIN',
        action,
        entityType,
        entityId,
      }
    });
  }
}
