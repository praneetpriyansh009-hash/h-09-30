import { PrismaService } from '../prisma/prisma.service';
export declare class NotificationsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getUserNotifications(userId: string): Promise<{
        data: string | null;
        id: string;
        createdAt: Date;
        userId: string;
        title: string;
        type: string;
        body: string;
        isRead: boolean;
    }[]>;
    markAsRead(id: string, userId: string): Promise<{
        data: string | null;
        id: string;
        createdAt: Date;
        userId: string;
        title: string;
        type: string;
        body: string;
        isRead: boolean;
    }>;
    createNotification(input: {
        userId: string;
        title: string;
        body: string;
        type?: string;
        data?: string;
    }): Promise<{
        data: string | null;
        id: string;
        createdAt: Date;
        userId: string;
        title: string;
        type: string;
        body: string;
        isRead: boolean;
    }>;
}
