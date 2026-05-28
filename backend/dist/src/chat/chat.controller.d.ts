import { ChatService } from './chat.service';
import type { SendMessageDto } from './dto/chat.schema';
export declare class ChatController {
    private readonly chatService;
    constructor(chatService: ChatService);
    getThread(req: any, bundleId: string, vendorId: string): Promise<{
        id: string;
        vendorId: string;
        createdAt: Date;
        bundleId: string;
        isRead: boolean;
        message: string;
        senderId: string;
        attachmentUrl: string | null;
    }[]>;
    sendMessage(req: any, bundleId: string, vendorId: string, data: SendMessageDto): Promise<{
        id: string;
        vendorId: string;
        createdAt: Date;
        bundleId: string;
        isRead: boolean;
        message: string;
        senderId: string;
        attachmentUrl: string | null;
    }>;
    markAsRead(req: any, id: string): Promise<{
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
