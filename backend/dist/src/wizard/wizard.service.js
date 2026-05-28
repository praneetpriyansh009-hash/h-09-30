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
exports.WizardService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const uuid_1 = require("uuid");
let WizardService = class WizardService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createSession(userId) {
        const sessionKey = (0, uuid_1.v4)();
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
    async getSession(sessionKey) {
        const session = await this.prisma.wizardSession.findUnique({ where: { sessionKey } });
        if (!session)
            throw new common_1.NotFoundException('Session not found or expired');
        return session;
    }
    async updateSession(sessionKey, updateData) {
        const session = await this.getSession(sessionKey);
        let mergedData = JSON.parse(session.data);
        if (updateData.data) {
            mergedData = { ...mergedData, ...updateData.data };
        }
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
    async deleteSession(sessionKey) {
        await this.getSession(sessionKey);
        return this.prisma.wizardSession.delete({ where: { sessionKey } });
    }
    async getThemes(occasionType) {
        const where = occasionType ? { moodKeywords: { contains: occasionType }, isActive: true } : { isActive: true };
        return this.prisma.theme.findMany({ where, orderBy: { sortOrder: 'asc' } });
    }
    async getVenues(filters) {
        const where = { isActive: true, vendor: { isApproved: true } };
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
    async getAddons(categorySlug) {
        const where = categorySlug ? { categorySlug, isActive: true } : { isActive: true };
        return this.prisma.addOnCatalogItem.findMany({ where, orderBy: { sortOrder: 'asc' } });
    }
    async getTransport(city) {
        const where = {
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
};
exports.WizardService = WizardService;
exports.WizardService = WizardService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], WizardService);
//# sourceMappingURL=wizard.service.js.map