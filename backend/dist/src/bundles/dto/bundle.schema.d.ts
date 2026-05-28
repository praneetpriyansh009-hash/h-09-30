import { z } from 'zod';
export declare const createBundleSchema: z.ZodObject<{
    title: z.ZodString;
    occasionType: z.ZodString;
    themeId: z.ZodOptional<z.ZodString>;
    partyDate: z.ZodString;
    partyTime: z.ZodOptional<z.ZodString>;
    guestCount: z.ZodNumber;
    budgetMax: z.ZodOptional<z.ZodNumber>;
    city: z.ZodString;
    items: z.ZodDefault<z.ZodArray<z.ZodObject<{
        vendorServiceId: z.ZodString;
        quantity: z.ZodDefault<z.ZodNumber>;
        customNote: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        quantity: number;
        vendorServiceId: string;
        customNote?: string | undefined;
    }, {
        vendorServiceId: string;
        quantity?: number | undefined;
        customNote?: string | undefined;
    }>, "many">>;
    addOns: z.ZodDefault<z.ZodArray<z.ZodObject<{
        addOnItemId: z.ZodString;
        quantity: z.ZodDefault<z.ZodNumber>;
        customNote: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        quantity: number;
        addOnItemId: string;
        customNote?: string | undefined;
    }, {
        addOnItemId: string;
        quantity?: number | undefined;
        customNote?: string | undefined;
    }>, "many">>;
}, "strip", z.ZodTypeAny, {
    city: string;
    title: string;
    occasionType: string;
    partyDate: string;
    guestCount: number;
    items: {
        quantity: number;
        vendorServiceId: string;
        customNote?: string | undefined;
    }[];
    addOns: {
        quantity: number;
        addOnItemId: string;
        customNote?: string | undefined;
    }[];
    themeId?: string | undefined;
    partyTime?: string | undefined;
    budgetMax?: number | undefined;
}, {
    city: string;
    title: string;
    occasionType: string;
    partyDate: string;
    guestCount: number;
    themeId?: string | undefined;
    partyTime?: string | undefined;
    budgetMax?: number | undefined;
    items?: {
        vendorServiceId: string;
        quantity?: number | undefined;
        customNote?: string | undefined;
    }[] | undefined;
    addOns?: {
        addOnItemId: string;
        quantity?: number | undefined;
        customNote?: string | undefined;
    }[] | undefined;
}>;
export type CreateBundleDto = z.infer<typeof createBundleSchema>;
export declare const addBundleItemSchema: z.ZodObject<{
    vendorServiceId: z.ZodString;
    quantity: z.ZodDefault<z.ZodNumber>;
    customNote: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    quantity: number;
    vendorServiceId: string;
    customNote?: string | undefined;
}, {
    vendorServiceId: string;
    quantity?: number | undefined;
    customNote?: string | undefined;
}>;
export type AddBundleItemDto = z.infer<typeof addBundleItemSchema>;
export declare const addBundleAddOnSchema: z.ZodObject<{
    addOnItemId: z.ZodString;
    quantity: z.ZodDefault<z.ZodNumber>;
    customNote: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    quantity: number;
    addOnItemId: string;
    customNote?: string | undefined;
}, {
    addOnItemId: string;
    quantity?: number | undefined;
    customNote?: string | undefined;
}>;
export type AddBundleAddOnDto = z.infer<typeof addBundleAddOnSchema>;
