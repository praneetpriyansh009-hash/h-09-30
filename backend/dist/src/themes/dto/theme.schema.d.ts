import { z } from 'zod';
export declare const createThemeSchema: z.ZodObject<{
    name: z.ZodString;
    slug: z.ZodString;
    description: z.ZodString;
    coverImageUrl: z.ZodString;
    moodKeywords: z.ZodString;
    isActive: z.ZodOptional<z.ZodBoolean>;
    sortOrder: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    name: string;
    slug: string;
    description: string;
    coverImageUrl: string;
    moodKeywords: string;
    isActive?: boolean | undefined;
    sortOrder?: number | undefined;
}, {
    name: string;
    slug: string;
    description: string;
    coverImageUrl: string;
    moodKeywords: string;
    isActive?: boolean | undefined;
    sortOrder?: number | undefined;
}>;
export declare const updateThemeSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    slug: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodString>;
    coverImageUrl: z.ZodOptional<z.ZodString>;
    moodKeywords: z.ZodOptional<z.ZodString>;
    isActive: z.ZodOptional<z.ZodOptional<z.ZodBoolean>>;
    sortOrder: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
}, "strip", z.ZodTypeAny, {
    name?: string | undefined;
    slug?: string | undefined;
    description?: string | undefined;
    coverImageUrl?: string | undefined;
    moodKeywords?: string | undefined;
    isActive?: boolean | undefined;
    sortOrder?: number | undefined;
}, {
    name?: string | undefined;
    slug?: string | undefined;
    description?: string | undefined;
    coverImageUrl?: string | undefined;
    moodKeywords?: string | undefined;
    isActive?: boolean | undefined;
    sortOrder?: number | undefined;
}>;
export type CreateThemeDto = z.infer<typeof createThemeSchema>;
export type UpdateThemeDto = z.infer<typeof updateThemeSchema>;
