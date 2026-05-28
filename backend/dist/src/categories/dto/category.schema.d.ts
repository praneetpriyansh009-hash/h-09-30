import { z } from 'zod';
export declare const createCategorySchema: z.ZodObject<{
    name: z.ZodString;
    slug: z.ZodString;
    iconUrl: z.ZodString;
    description: z.ZodString;
    defaultCommissionRate: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    name: string;
    slug: string;
    iconUrl: string;
    description: string;
    defaultCommissionRate: number;
}, {
    name: string;
    slug: string;
    iconUrl: string;
    description: string;
    defaultCommissionRate: number;
}>;
export declare const updateCategorySchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    slug: z.ZodOptional<z.ZodString>;
    iconUrl: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodString>;
    defaultCommissionRate: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    name?: string | undefined;
    slug?: string | undefined;
    iconUrl?: string | undefined;
    description?: string | undefined;
    defaultCommissionRate?: number | undefined;
}, {
    name?: string | undefined;
    slug?: string | undefined;
    iconUrl?: string | undefined;
    description?: string | undefined;
    defaultCommissionRate?: number | undefined;
}>;
export type CreateCategoryDto = z.infer<typeof createCategorySchema>;
export type UpdateCategoryDto = z.infer<typeof updateCategorySchema>;
