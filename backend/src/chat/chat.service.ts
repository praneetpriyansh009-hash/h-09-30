import { Injectable, NotFoundException, ForbiddenException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import type { SendMessageDto } from './dto/chat.schema';

@Injectable()
export class ChatService {
  constructor(private readonly prisma: PrismaService) {}

  async getThread(bundleId: string, vendorId: string, userId: string, userRole: string) {
    const bundle = await this.prisma.partyBundle.findUnique({
      where: { id: bundleId },
      include: { items: { include: { vendorService: true } }, collaborators: true }
    });

    if (!bundle) throw new NotFoundException('Bundle not found');

    if (userRole === 'CUSTOMER') {
      if (bundle.userId !== userId && !bundle.collaborators.some(c => c.userId === userId)) {
        throw new ForbiddenException('Not authorized to view this chat');
      }
      const hasVendor = bundle.items.some(item => item.vendorService.vendorId === vendorId);
      if (!hasVendor) throw new BadRequestException('Vendor is not part of this bundle');
    }

    if (userRole === 'VENDOR') {
      const vendorProfile = await this.prisma.vendorProfile.findUnique({ where: { userId } });
      if (!vendorProfile || vendorProfile.id !== vendorId) {
        throw new ForbiddenException('Not authorized');
      }
    }

    return this.prisma.chatMessage.findMany({
      where: { bundleId, vendorId },
      orderBy: { createdAt: 'asc' }
    });
  }

  async sendMessage(bundleId: string, vendorId: string, userId: string, userRole: string, data: SendMessageDto) {
    const bundle = await this.prisma.partyBundle.findUnique({
      where: { id: bundleId },
      include: { items: { include: { vendorService: true } }, collaborators: true }
    });

    if (!bundle) throw new NotFoundException('Bundle not found');

    if (userRole === 'CUSTOMER') {
      if (bundle.userId !== userId && !bundle.collaborators.some(c => c.userId === userId)) {
        throw new ForbiddenException('Not authorized to chat in this bundle');
      }
      const hasVendor = bundle.items.some(item => item.vendorService.vendorId === vendorId);
      if (!hasVendor) throw new BadRequestException('Vendor is not part of this bundle');
    } else if (userRole === 'VENDOR') {
      const vendorProfile = await this.prisma.vendorProfile.findUnique({ where: { userId } });
      if (!vendorProfile || vendorProfile.id !== vendorId) {
        throw new ForbiddenException('Not authorized');
      }
    } else {
      throw new ForbiddenException('Invalid role for chat');
    }

    // Schema field is "message", not "content"; no "senderType" column exists.
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

  async markAsRead(messageId: string, userId: string, _userRole: string) {
    const message = await this.prisma.chatMessage.findUnique({ where: { id: messageId } });
    if (!message) throw new NotFoundException('Message not found');

    // Only someone other than the sender may mark a message as read.
    if (message.senderId === userId) {
      throw new ForbiddenException('Cannot mark own message as read');
    }

    return this.prisma.chatMessage.update({
      where: { id: messageId },
      data: { isRead: true }
    });
  }
}
