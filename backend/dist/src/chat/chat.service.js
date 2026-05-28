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
exports.ChatService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let ChatService = class ChatService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getThread(bundleId, vendorId, userId, userRole) {
        const bundle = await this.prisma.partyBundle.findUnique({
            where: { id: bundleId },
            include: { items: { include: { vendorService: true } }, collaborators: true }
        });
        if (!bundle)
            throw new common_1.NotFoundException('Bundle not found');
        if (userRole === 'CUSTOMER') {
            if (bundle.userId !== userId && !bundle.collaborators.some(c => c.userId === userId)) {
                throw new common_1.ForbiddenException('Not authorized to view this chat');
            }
            const hasVendor = bundle.items.some(item => item.vendorService.vendorId === vendorId);
            if (!hasVendor)
                throw new common_1.BadRequestException('Vendor is not part of this bundle');
        }
        if (userRole === 'VENDOR') {
            const vendorProfile = await this.prisma.vendorProfile.findUnique({ where: { userId } });
            if (!vendorProfile || vendorProfile.id !== vendorId) {
                throw new common_1.ForbiddenException('Not authorized');
            }
        }
        return this.prisma.chatMessage.findMany({
            where: { bundleId, vendorId },
            orderBy: { createdAt: 'asc' }
        });
    }
    async sendMessage(bundleId, vendorId, userId, userRole, data) {
        const bundle = await this.prisma.partyBundle.findUnique({
            where: { id: bundleId },
            include: { items: { include: { vendorService: true } }, collaborators: true }
        });
        if (!bundle)
            throw new common_1.NotFoundException('Bundle not found');
        if (userRole === 'CUSTOMER') {
            if (bundle.userId !== userId && !bundle.collaborators.some(c => c.userId === userId)) {
                throw new common_1.ForbiddenException('Not authorized to chat in this bundle');
            }
            const hasVendor = bundle.items.some(item => item.vendorService.vendorId === vendorId);
            if (!hasVendor)
                throw new common_1.BadRequestException('Vendor is not part of this bundle');
        }
        else if (userRole === 'VENDOR') {
            const vendorProfile = await this.prisma.vendorProfile.findUnique({ where: { userId } });
            if (!vendorProfile || vendorProfile.id !== vendorId) {
                throw new common_1.ForbiddenException('Not authorized');
            }
        }
        else {
            throw new common_1.ForbiddenException('Invalid role for chat');
        }
        return this.prisma.chatMessage.create({
            data: {
                bundleId,
                vendorId,
                senderId: userId,
                message: data.content,
                isRead: false
            }
        });
    }
    async markAsRead(messageId, userId, _userRole) {
        const message = await this.prisma.chatMessage.findUnique({ where: { id: messageId } });
        if (!message)
            throw new common_1.NotFoundException('Message not found');
        if (message.senderId === userId) {
            throw new common_1.ForbiddenException('Cannot mark own message as read');
        }
        return this.prisma.chatMessage.update({
            where: { id: messageId },
            data: { isRead: true }
        });
    }
};
exports.ChatService = ChatService;
exports.ChatService = ChatService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ChatService);
//# sourceMappingURL=chat.service.js.map