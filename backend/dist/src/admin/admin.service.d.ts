import { PrismaService } from '../prisma/prisma.service';
export declare class AdminService {
    private readonly prisma;
    constructor(prisma: PrismaService);
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
    approveVendor(id: string, adminId: string): Promise<{
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
    rejectVendor(id: string, adminId: string): Promise<{
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
    setCommission(id: string, rate: number, adminId: string): Promise<{
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
    getAuditLogs(page?: number, limit?: number): Promise<{
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
    private logAction;
}
