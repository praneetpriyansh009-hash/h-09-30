import { PrismaService } from '../prisma/prisma.service';
import { RegisterVendorDto, UpdateVendorDto, SetAvailabilityDto } from './dto/vendor.schema';
export declare class VendorsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    register(userId: string, data: RegisterVendorDto): Promise<{
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
        themes: ({
            theme: {
                name: string;
                id: string;
                slug: string;
                description: string;
                coverImageUrl: string;
                moodKeywords: string;
                isActive: boolean;
                sortOrder: number;
            };
        } & {
            vendorId: string;
            themeId: string;
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
    }>;
    getDashboard(userId: string): Promise<{
        totalBookings: number;
        totalEarnings: number;
        profile: {
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
        };
    }>;
    updateProfile(userId: string, data: UpdateVendorDto): Promise<{
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
    setAvailability(userId: string, data: SetAvailabilityDto): Promise<{
        id: string;
        vendorId: string;
        date: Date | null;
        isTemplate: boolean;
        dayOfWeek: number | null;
        isBlocked: boolean;
        slots: string;
    }>;
    findAll(filters: {
        city?: string;
        categoryId?: string;
    }): Promise<({
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
    findOne(id: string): Promise<{
        services: {
            id: string;
            description: string;
            isActive: boolean;
            vendorId: string;
            categoryId: string;
            title: string;
            basePrice: number;
            priceUnit: string;
            maxCapacity: number | null;
            photos: string;
            tags: string;
            priceHistory: string;
        }[];
        reviews: ({
            user: {
                name: string;
                profilePicUrl: string | null;
            };
        } & {
            id: string;
            vendorId: string;
            createdAt: Date;
            userId: string;
            rating: number;
            reviewText: string;
            vendorReply: string | null;
            vendorRepliedAt: Date | null;
            isVisible: boolean;
            bookingId: string;
        })[];
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
        themes: ({
            theme: {
                name: string;
                id: string;
                slug: string;
                description: string;
                coverImageUrl: string;
                moodKeywords: string;
                isActive: boolean;
                sortOrder: number;
            };
        } & {
            vendorId: string;
            themeId: string;
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
    }>;
}
