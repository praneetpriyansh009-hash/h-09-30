import { AdminService } from './admin.service';
import type { SetCommissionDto } from './dto/admin.schema';
export declare class AdminController {
    private readonly adminService;
    constructor(adminService: AdminService);
    getPendingVendors(): Promise<({
        user: {
            name: string;
            email: string;
        };
        categories: ({
            category: {
                name: string;
                id: string;
                slug: string;
                iconUrl: string;
                description: string;
                defaultCommissionRate: number;
            };
        } & {
            vendorId: string;
            isPrimary: boolean;
            categoryId: string;
        })[];
    } & {
        id: string;
        description: string;
        city: string;
        state: string;
        createdAt: Date;
        updatedAt: Date;
        businessName: string;
        gstin: string | null;
        pincode: string;
        addressLine: string;
        lat: number | null;
        lng: number | null;
        commissionRate: number;
        isFeatured: boolean;
        isApproved: boolean;
        averageRating: number;
        totalBookings: number;
        bankAccountDetails: string | null;
        responseTimeHours: number | null;
        minBookingAdvanceHours: number;
        userId: string;
    })[]>;
    approveVendor(req: any, id: string): Promise<{
        id: string;
        description: string;
        city: string;
        state: string;
        createdAt: Date;
        updatedAt: Date;
        businessName: string;
        gstin: string | null;
        pincode: string;
        addressLine: string;
        lat: number | null;
        lng: number | null;
        commissionRate: number;
        isFeatured: boolean;
        isApproved: boolean;
        averageRating: number;
        totalBookings: number;
        bankAccountDetails: string | null;
        responseTimeHours: number | null;
        minBookingAdvanceHours: number;
        userId: string;
    }>;
    rejectVendor(req: any, id: string): Promise<{
        id: string;
        description: string;
        city: string;
        state: string;
        createdAt: Date;
        updatedAt: Date;
        businessName: string;
        gstin: string | null;
        pincode: string;
        addressLine: string;
        lat: number | null;
        lng: number | null;
        commissionRate: number;
        isFeatured: boolean;
        isApproved: boolean;
        averageRating: number;
        totalBookings: number;
        bankAccountDetails: string | null;
        responseTimeHours: number | null;
        minBookingAdvanceHours: number;
        userId: string;
    }>;
    setCommission(req: any, id: string, data: SetCommissionDto): Promise<{
        id: string;
        description: string;
        city: string;
        state: string;
        createdAt: Date;
        updatedAt: Date;
        businessName: string;
        gstin: string | null;
        pincode: string;
        addressLine: string;
        lat: number | null;
        lng: number | null;
        commissionRate: number;
        isFeatured: boolean;
        isApproved: boolean;
        averageRating: number;
        totalBookings: number;
        bankAccountDetails: string | null;
        responseTimeHours: number | null;
        minBookingAdvanceHours: number;
        userId: string;
    }>;
    getRevenueStats(): Promise<{
        totalGmv: number;
        platformRevenue: number;
        vendorEarnings: number;
    }>;
    getAuditLogs(page?: string): Promise<{
        id: string;
        createdAt: Date;
        actorId: string;
        actorRole: string;
        action: string;
        entityType: string;
        entityId: string;
        before: string | null;
        after: string | null;
        ipAddress: string | null;
    }[]>;
}
