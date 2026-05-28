import { PrismaService } from '../prisma/prisma.service';
import type { SendMessageDto } from './dto/chat.schema';
export declare class ChatService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getThread(bundleId: string, vendorId: string, userId: string, userRole: string): Promise<{
        id: string;
        vendorId: string;
        createdAt: Date;
        bundleId: string;
        isRead: boolean;
        message: string;
        senderId: string;
        attachmentUrl: string | null;
    }[]>;
    sendMessage(bundleId: string, vendorId: string, userId: string, userRole: string, data: SendMessageDto): Promise<{
        id: string;
        vendorId: string;
        createdAt: Date;
        bundleId: string;
        isRead: boolean;
        message: string;
        senderId: string;
        attachmentUrl: string | null;
    }>;
    markAsRead(messageId: string, userId: string, _userRole: string): Promise<{
        id: string;
        vendorId: string;
        createdAt: Date;
        bundleId: string;
        isRead: boolean;
        message: string;
        senderId: string;
        attachmentUrl: string | null;
    }>;
}
