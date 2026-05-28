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
exports.ThemesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let ThemesService = class ThemesService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(data) {
        return this.prisma.theme.create({ data });
    }
    async findAll(occasionType) {
        if (occasionType) {
            return this.prisma.theme.findMany({
                where: {
                    moodKeywords: {
                        contains: occasionType,
                    },
                },
                orderBy: { sortOrder: 'asc' },
            });
        }
        return this.prisma.theme.findMany({
            orderBy: { sortOrder: 'asc' },
        });
    }
    async findOne(id) {
        const theme = await this.prisma.theme.findUnique({ where: { id } });
        if (!theme) {
            throw new common_1.NotFoundException(`Theme with ID ${id} not found`);
        }
        return theme;
    }
    async update(id, data) {
        await this.findOne(id);
        return this.prisma.theme.update({ where: { id }, data });
    }
    async remove(id) {
        await this.findOne(id);
        return this.prisma.theme.delete({ where: { id } });
    }
};
exports.ThemesService = ThemesService;
exports.ThemesService = ThemesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ThemesService);
//# sourceMappingURL=themes.service.js.map