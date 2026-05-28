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
exports.BundlesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let BundlesService = class BundlesService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(userId, data) {
        const { items, addOns, ...bundleData } = data;
        const services = await Promise.all(items.map(async (item) => {
            const service = await this.prisma.vendorService.findUnique({
                where: { id: item.vendorServiceId },
                include: { vendor: true }
            });
            if (!service)
                throw new common_1.BadRequestException(`Service ${item.vendorServiceId} not found`);
            return { ...item, service };
        }));
        const addOnItems = await Promise.all(addOns.map(async (addon) => {
            const item = await this.prisma.addOnCatalogItem.findUnique({ where: { id: addon.addOnItemId } });
            if (!item)
                throw new common_1.BadRequestException(`AddOn ${addon.addOnItemId} not found`);
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
    async findOne(id, userId) {
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
        if (!bundle)
            throw new common_1.NotFoundException('Bundle not found');
        if (bundle.userId !== userId && !bundle.collaborators.some(c => c.userId === userId)) {
            throw new common_1.ForbiddenException('Not authorized to access this bundle');
        }
        return bundle;
    }
    async addItem(id, userId, data) {
        const bundle = await this.findOne(id, userId);
        if (bundle.status !== 'DRAFT')
            throw new common_1.BadRequestException('Cannot add items to a non-draft bundle');
        const service = await this.prisma.vendorService.findUnique({
            where: { id: data.vendorServiceId },
            include: { vendor: true }
        });
        if (!service)
            throw new common_1.NotFoundException('Service not found');
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
        await this.prisma.partyBundle.update({
            where: { id: bundle.id },
            data: { totalAmount: bundle.totalAmount + itemTotal }
        });
        return this.findOne(id, userId);
    }
    async removeItem(id, itemId, userId) {
        const bundle = await this.findOne(id, userId);
        if (bundle.status !== 'DRAFT')
            throw new common_1.BadRequestException('Cannot modify a non-draft bundle');
        const item = await this.prisma.bundleItem.findUnique({ where: { id: itemId } });
        if (!item || item.bundleId !== id)
            throw new common_1.NotFoundException('Item not found in this bundle');
        const itemTotal = item.unitPrice * item.quantity;
        await this.prisma.bundleItem.delete({ where: { id: itemId } });
        await this.prisma.partyBundle.update({
            where: { id: bundle.id },
            data: { totalAmount: Math.max(0, bundle.totalAmount - itemTotal) }
        });
        return this.findOne(id, userId);
    }
    async addAddOn(id, userId, data) {
        const bundle = await this.findOne(id, userId);
        if (bundle.status !== 'DRAFT')
            throw new common_1.BadRequestException('Cannot modify a non-draft bundle');
        const addOn = await this.prisma.addOnCatalogItem.findUnique({ where: { id: data.addOnItemId } });
        if (!addOn)
            throw new common_1.NotFoundException('AddOn not found');
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
    async removeAddOn(id, addOnId, userId) {
        const bundle = await this.findOne(id, userId);
        if (bundle.status !== 'DRAFT')
            throw new common_1.BadRequestException('Cannot modify a non-draft bundle');
        const addon = await this.prisma.bundleAddOn.findUnique({ where: { id: addOnId } });
        if (!addon || addon.bundleId !== id)
            throw new common_1.NotFoundException('Addon not found in this bundle');
        await this.prisma.bundleAddOn.delete({ where: { id: addOnId } });
        await this.prisma.partyBundle.update({
            where: { id: bundle.id },
            data: { totalAmount: Math.max(0, bundle.totalAmount - addon.totalPrice) }
        });
        return this.findOne(id, userId);
    }
    async checkout(id, userId) {
        const bundle = await this.findOne(id, userId);
        if (bundle.status !== 'DRAFT')
            throw new common_1.BadRequestException('Bundle is already checked out or confirmed');
        if (bundle.totalAmount <= 0)
            throw new common_1.BadRequestException('Bundle total amount must be greater than zero');
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
};
exports.BundlesService = BundlesService;
exports.BundlesService = BundlesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], BundlesService);
//# sourceMappingURL=bundles.service.js.map