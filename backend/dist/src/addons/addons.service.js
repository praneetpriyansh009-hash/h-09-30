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
exports.AddonsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let AddonsService = class AddonsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(data) {
        return this.prisma.addOnCatalogItem.create({ data });
    }
    async findAll(categorySlug) {
        const where = categorySlug ? { categorySlug, isActive: true } : { isActive: true };
        return this.prisma.addOnCatalogItem.findMany({
            where,
            orderBy: { sortOrder: 'asc' },
        });
    }
    async findOne(id) {
        const addon = await this.prisma.addOnCatalogItem.findUnique({ where: { id } });
        if (!addon) {
            throw new common_1.NotFoundException(`Addon with ID ${id} not found`);
        }
        return addon;
    }
    async update(id, data) {
        await this.findOne(id);
        return this.prisma.addOnCatalogItem.update({ where: { id }, data });
    }
    async remove(id) {
        await this.findOne(id);
        return this.prisma.addOnCatalogItem.delete({ where: { id } });
    }
};
exports.AddonsService = AddonsService;
exports.AddonsService = AddonsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AddonsService);
//# sourceMappingURL=addons.service.js.map