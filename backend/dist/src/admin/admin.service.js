"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let AdminService = class AdminService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getPendingVendors() {
        return this.prisma.vendorProfile.findMany({
            where: { isApproved: false },
            include: {
                user: { select: { name: true, email: true } },
                categories: { include: { category: true } }
            }
        });
    }
    async approveVendor(id, adminId) {
        await this.logAction(adminId, 'APPROVE_VENDOR', 'VendorProfile', id);
        return this.prisma.vendorProfile.update({
            where: { id },
            data: { isApproved: true }
        });
    }
    async rejectVendor(id, adminId) {
        await this.logAction(adminId, 'REJECT_VENDOR', 'VendorProfile', id);
        return this.prisma.vendorProfile.update({
            where: { id },
            data: { isApproved: false }
        });
    }
    async setCommission(id, rate, adminId) {
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
        return this.prisma.auditLog.findMany({
            skip: (page - 1) * limit,
            take: limit,
            orderBy: { createdAt: 'desc' },
        });
    }
    async logAction(actorId, action, entityType, entityId) {
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
};
exports.AdminService = AdminService;
exports.AdminService = AdminService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AdminService);
//# sourceMappingURL=admin.service.js.map