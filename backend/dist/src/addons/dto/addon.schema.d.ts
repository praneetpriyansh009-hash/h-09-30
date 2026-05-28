import { z } from 'zod';
export declare const createAddonSchema: z.ZodObject<{
    name: z.ZodString;
    description: z.ZodString;
    imageUrl: z.ZodString;
    price: z.ZodNumber;
    categorySlug: z.ZodString;
    isVendorFulfilled: z.ZodOptional<z.ZodBoolean>;
    vendorId: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    isActive: z.ZodOptional<z.ZodBoolean>;
    sortOrder: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    name: string;
    description: string;
    imageUrl: string;
    price: number;
    categorySlug: string;
    isActive?: boolean | undefined;
    sortOrder?: number | undefined;
    isVendorFulfilled?: boolean | undefined;
    vendorId?: string | null | undefined;
}, {
    name: string;
    description: string;
    imageUrl: string;
    price: number;
    categorySlug: string;
    isActive?: boolean | undefined;
    sortOrder?: number | undefined;
    isVendorFulfilled?: boolean | undefined;
    vendorId?: string | null | undefined;
}>;
export declare const updateAddonSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodString>;
    imageUrl: z.ZodOptional<z.ZodString>;
    price: z.ZodOptional<z.ZodNumber>;
    categorySlug: z.ZodOptional<z.ZodString>;
    isVendorFulfilled: z.ZodOptional<z.ZodOptional<z.ZodBoolean>>;
    vendorId: z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodString>>>;
    isActive: z.ZodOptional<z.ZodOptional<z.ZodBoolean>>;
    sortOrder: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
}, "strip", z.ZodTypeAny, {
    name?: string | undefined;
    description?: string | undefined;
    isActive?: boolean | undefined;
    sortOrder?: number | undefined;
    imageUrl?: string | undefined;
    price?: number | undefined;
    categorySlug?: string | undefined;
    isVendorFulfilled?: boolean | undefined;
    vendorId?: string | null | undefined;
}, {
    name?: string | undefined;
    description?: string | undefined;
    isActive?: boolean | undefined;
    sortOrder?: number | undefined;
    imageUrl?: string | undefined;
    price?: number | undefined;
    categorySlug?: string | undefined;
    isVendorFulfilled?: boolean | undefined;
    vendorId?: string | null | undefined;
}>;
export type CreateAddonDto = z.infer<typeof createAddonSchema>;
export type UpdateAddonDto = z.infer<typeof updateAddonSchema>;
