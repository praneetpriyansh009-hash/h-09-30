import { PrismaService } from '../prisma/prisma.service';
export declare class WizardService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    createSession(userId?: string): Promise<{
        data: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string | null;
        sessionKey: string;
        currentStep: number;
        expiresAt: Date;
    }>;
    getSession(sessionKey: string): Promise<{
        data: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string | null;
        sessionKey: string;
        currentStep: number;
        expiresAt: Date;
    }>;
    updateSession(sessionKey: string, updateData: {
        currentStep?: number;
        data?: any;
    }): Promise<{
        data: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string | null;
        sessionKey: string;
        currentStep: number;
        expiresAt: Date;
    }>;
    deleteSession(sessionKey: string): Promise<{
        data: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string | null;
        sessionKey: string;
        currentStep: number;
        expiresAt: Date;
    }>;
    getThemes(occasionType?: string): Promise<{
        name: string;
        id: string;
        slug: string;
        description: string;
        coverImageUrl: string;
        moodKeywords: string;
        isActive: boolean;
        sortOrder: number;
    }[]>;
    getVenues(filters: any): Promise<({
        category: {
            name: string;
            id: string;
            slug: string;
            iconUrl: string;
            description: string;
            defaultCommissionRate: number;
        };
        vendor: {
            city: string;
            businessName: string;
            isFeatured: boolean;
            averageRating: number;
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
    getAddons(categorySlug?: string): Promise<{
        name: string;
        id: string;
        description: string;
        isActive: boolean;
        sortOrder: number;
        imageUrl: string;
        price: number;
        categorySlug: string;
        isVendorFulfilled: boolean;
        vendorId: string | null;
    }[]>;
    getTransport(city?: string): Promise<({
        vendor: {
            city: string;
            businessName: string;
            averageRating: number;
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
}
