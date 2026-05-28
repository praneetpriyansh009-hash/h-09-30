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
exports.ServicesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let ServicesService = class ServicesService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(userId, data) {
        const vendor = await this.prisma.vendorProfile.findUnique({ where: { userId } });
        if (!vendor)
            throw new common_1.NotFoundException('Vendor profile not found');
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
    async findAll(filters) {
        const where = {
            isActive: true,
            vendor: { isApproved: true }
        };
        if (filters.categoryId)
            where.categoryId = filters.categoryId;
        if (filters.minPrice !== undefined || filters.maxPrice !== undefined) {
            where.basePrice = {};
            if (filters.minPrice !== undefined)
                where.basePrice.gte = filters.minPrice;
            if (filters.maxPrice !== undefined)
                where.basePrice.lte = filters.maxPrice;
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
                { vendor: { isFeatured: 'desc' } },
                { vendor: { averageRating: 'desc' } }
            ]
        });
    }
    async findOne(id) {
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
        if (!service)
            throw new common_1.NotFoundException('Service not found');
        return service;
    }
    async update(userId, id, data) {
        const vendor = await this.prisma.vendorProfile.findUnique({ where: { userId } });
        if (!vendor)
            throw new common_1.NotFoundException('Vendor profile not found');
        const service = await this.prisma.vendorService.findUnique({ where: { id } });
        if (!service)
            throw new common_1.NotFoundException('Service not found');
        if (service.vendorId !== vendor.id)
            throw new common_1.ForbiddenException('Not authorized to edit this service');
        const updateData = { ...data };
        if (data.photos)
            updateData.photos = JSON.stringify(data.photos);
        if (data.tags)
            updateData.tags = JSON.stringify(data.tags);
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
    async remove(userId, id) {
        const vendor = await this.prisma.vendorProfile.findUnique({ where: { userId } });
        if (!vendor)
            throw new common_1.NotFoundException('Vendor profile not found');
        const service = await this.prisma.vendorService.findUnique({ where: { id } });
        if (!service)
            throw new common_1.NotFoundException('Service not found');
        if (service.vendorId !== vendor.id)
            throw new common_1.ForbiddenException('Not authorized to edit this service');
        return this.prisma.vendorService.update({
            where: { id },
            data: { isActive: false }
        });
    }
};
exports.ServicesService = ServicesService;
exports.ServicesService = ServicesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ServicesService);
//# sourceMappingURL=services.service.js.map