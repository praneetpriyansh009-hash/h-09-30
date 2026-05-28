import { ServicesService } from './services.service';
import type { CreateServiceDto, UpdateServiceDto } from './dto/service.schema';
export declare class ServicesController {
    private readonly servicesService;
    constructor(servicesService: ServicesService);
    create(req: any, data: CreateServiceDto): Promise<{
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
    findAll(categoryId?: string, city?: string, themeId?: string, minPrice?: string, maxPrice?: string, guests?: string): Promise<({
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
    update(req: any, id: string, data: UpdateServiceDto): Promise<{
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
    remove(req: any, id: string): Promise<{
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
