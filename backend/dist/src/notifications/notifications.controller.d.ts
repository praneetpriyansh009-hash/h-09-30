import { NotificationsService } from './notifications.service';
export declare class NotificationsController {
    private readonly notificationsService;
    constructor(notificationsService: NotificationsService);
    getUserNotifications(req: any): Promise<{
        data: string | null;
        id: string;
        createdAt: Date;
        userId: string;
        title: string;
        type: string;
        body: string;
        isRead: boolean;
    }[]>;
    markAsRead(req: any, id: string): Promise<{
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
