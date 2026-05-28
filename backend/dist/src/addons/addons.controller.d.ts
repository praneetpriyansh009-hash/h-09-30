import { AddonsService } from './addons.service';
import type { CreateAddonDto, UpdateAddonDto } from './dto/addon.schema';
export declare class AddonsController {
    private readonly addonsService;
    constructor(addonsService: AddonsService);
    create(data: CreateAddonDto): Promise<{
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
    }>;
    findAll(categorySlug?: string): Promise<{
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
    findOne(id: string): Promise<{
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
    }>;
    update(id: string, data: UpdateAddonDto): Promise<{
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
    }>;
    remove(id: string): Promise<{
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
    }>;
}
