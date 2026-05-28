import { PrismaService } from '../prisma/prisma.service';
import { CreateServiceDto, UpdateServiceDto } from './dto/service.schema';
export declare class ServicesService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(userId: string, data: CreateServiceDto): Promise<{
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
    }>;
    findAll(filters: {
        categoryId?: string;
        city?: string;
        themeId?: string;
        minPrice?: number;
        maxPrice?: number;
        guests?: number;
    }): Promise<({
        category: {
            name: string;
            slug: string;
        };
        vendor: {
            city: string;
            businessName: string;
            isFeatured: boolean;
            averageRating: number;
            totalBookings: number;
        };
    } & {
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
    })[]>;
    findOne(id: string): Promise<{
        category: {
            name: string;
            id: string;
            slug: string;
            iconUrl: string;
            description: string;
            defaultCommissionRate: number;
        };
        vendor: {
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
        };
    } & {
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
    }>;
    update(userId: string, id: string, data: UpdateServiceDto): Promise<{
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
    }>;
    remove(userId: string, id: string): Promise<{
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
    }>;
}
