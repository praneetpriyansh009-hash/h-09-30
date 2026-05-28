import { z } from 'zod';
export declare const createSessionSchema: z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>;
export declare const updateSessionSchema: z.ZodObject<{
    currentStep: z.ZodOptional<z.ZodNumber>;
    data: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
}, "strip", z.ZodTypeAny, {
    data?: Record<string, any> | undefined;
    currentStep?: number | undefined;
}, {
    data?: Record<string, any> | undefined;
    currentStep?: number | undefined;
}>;
export type UpdateSessionDto = z.infer<typeof updateSessionSchema>;
export declare const venueFiltersSchema: z.ZodObject<{
    themeId: z.ZodOptional<z.ZodString>;
    city: z.ZodOptional<z.ZodString>;
    date: z.ZodOptional<z.ZodString>;
    guests: z.ZodOptional<z.ZodEffects<z.ZodString, number, string>>;
    budgetMax: z.ZodOptional<z.ZodEffects<z.ZodString, number, string>>;
}, "strip", z.ZodTypeAny, {
    city?: string | undefined;
    themeId?: string | undefined;
    budgetMax?: number | undefined;
    date?: string | undefined;
    guests?: number | undefined;
}, {
    city?: string | undefined;
    themeId?: string | undefined;
    budgetMax?: string | undefined;
    date?: string | undefined;
    guests?: string | undefined;
}>;
