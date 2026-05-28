import { z } from 'zod';
export declare const createServiceSchema: z.ZodObject<{
    categoryId: z.ZodString;
    title: z.ZodString;
    description: z.ZodString;
    basePrice: z.ZodNumber;
    priceUnit: z.ZodString;
    maxCapacity: z.ZodOptional<z.ZodNumber>;
    photos: z.ZodArray<z.ZodString, "many">;
    tags: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
}, "strip", z.ZodTypeAny, {
    description: string;
    categoryId: string;
    title: string;
    basePrice: number;
    priceUnit: string;
    photos: string[];
    tags: string[];
    maxCapacity?: number | undefined;
}, {
    description: string;
    categoryId: string;
    title: string;
    basePrice: number;
    priceUnit: string;
    photos: string[];
    maxCapacity?: number | undefined;
    tags?: string[] | undefined;
}>;
export type CreateServiceDto = z.infer<typeof createServiceSchema>;
export declare const updateServiceSchema: z.ZodObject<{
    categoryId: z.ZodOptional<z.ZodString>;
    title: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodString>;
    basePrice: z.ZodOptional<z.ZodNumber>;
    priceUnit: z.ZodOptional<z.ZodString>;
    maxCapacity: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    photos: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    tags: z.ZodOptional<z.ZodDefault<z.ZodArray<z.ZodString, "many">>>;
}, "strip", z.ZodTypeAny, {
    description?: string | undefined;
    categoryId?: string | undefined;
    title?: string | undefined;
    basePrice?: number | undefined;
    priceUnit?: string | undefined;
    maxCapacity?: number | undefined;
    photos?: string[] | undefined;
    tags?: string[] | undefined;
}, {
    description?: string | undefined;
    categoryId?: string | undefined;
    title?: string | undefined;
    basePrice?: number | undefined;
    priceUnit?: string | undefined;
    maxCapacity?: number | undefined;
    photos?: string[] | undefined;
    tags?: string[] | undefined;
}>;
export type UpdateServiceDto = z.infer<typeof updateServiceSchema>;
