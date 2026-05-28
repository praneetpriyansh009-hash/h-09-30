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
exports.VendorsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let VendorsService = class VendorsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async register(userId, data) {
        const existing = await this.prisma.vendorProfile.findUnique({ where: { userId } });
        if (existing) {
            throw new common_1.BadRequestException('User is already registered as a vendor');
        }
        const { categories, themes, bankAccountDetails, ...profileData } = data;
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
                        isPrimary: true
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
        await this.prisma.user.update({
            where: { id: userId },
            data: { role: 'VENDOR' }
        });
        return vendor;
    }
    async getDashboard(userId) {
        const vendor = await this.prisma.vendorProfile.findUnique({ where: { userId } });
        if (!vendor)
            throw new common_1.NotFoundException('Vendor profile not found');
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
    async updateProfile(userId, data) {
        const vendor = await this.prisma.vendorProfile.findUnique({ where: { userId } });
        if (!vendor)
            throw new common_1.NotFoundException('Vendor profile not found');
        return this.prisma.vendorProfile.update({
            where: { id: vendor.id },
            data: {
                ...data,
                bankAccountDetails: data.bankAccountDetails ? JSON.stringify(data.bankAccountDetails) : undefined,
            },
        });
    }
    async setAvailability(userId, data) {
        const vendor = await this.prisma.vendorProfile.findUnique({ where: { userId } });
        if (!vendor)
            throw new common_1.NotFoundException('Vendor profile not found');
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
    async findAll(filters) {
        const where = { isApproved: true };
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
    async findOne(id) {
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
            throw new common_1.NotFoundException('Vendor not found or not approved');
        }
        return vendor;
    }
};
exports.VendorsService = VendorsService;
exports.VendorsService = VendorsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], VendorsService);
//# sourceMappingURL=vendors.service.js.map