import { z } from 'zod';
export declare const registerVendorSchema: z.ZodObject<{
    businessName: z.ZodString;
    description: z.ZodString;
    gstin: z.ZodOptional<z.ZodString>;
    city: z.ZodString;
    state: z.ZodString;
    pincode: z.ZodString;
    addressLine: z.ZodString;
    categories: z.ZodArray<z.ZodString, "many">;
    themes: z.ZodArray<z.ZodString, "many">;
    bankAccountDetails: z.ZodOptional<z.ZodObject<{
        accountName: z.ZodString;
        accountNumber: z.ZodString;
        ifscCode: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        accountName: string;
        accountNumber: string;
        ifscCode: string;
    }, {
        accountName: string;
        accountNumber: string;
        ifscCode: string;
    }>>;
}, "strip", z.ZodTypeAny, {
    description: string;
    city: string;
    state: string;
    businessName: string;
    pincode: string;
    addressLine: string;
    categories: string[];
    themes: string[];
    gstin?: string | undefined;
    bankAccountDetails?: {
        accountName: string;
        accountNumber: string;
        ifscCode: string;
    } | undefined;
}, {
    description: string;
    city: string;
    state: string;
    businessName: string;
    pincode: string;
    addressLine: string;
    categories: string[];
    themes: string[];
    gstin?: string | undefined;
    bankAccountDetails?: {
        accountName: string;
        accountNumber: string;
        ifscCode: string;
    } | undefined;
}>;
export type RegisterVendorDto = z.infer<typeof registerVendorSchema>;
export declare const updateVendorSchema: z.ZodObject<Omit<{
    businessName: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodString>;
    gstin: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    city: z.ZodOptional<z.ZodString>;
    state: z.ZodOptional<z.ZodString>;
    pincode: z.ZodOptional<z.ZodString>;
    addressLine: z.ZodOptional<z.ZodString>;
    categories: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    themes: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    bankAccountDetails: z.ZodOptional<z.ZodOptional<z.ZodObject<{
        accountName: z.ZodString;
        accountNumber: z.ZodString;
        ifscCode: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        accountName: string;
        accountNumber: string;
        ifscCode: string;
    }, {
        accountName: string;
        accountNumber: string;
        ifscCode: string;
    }>>>;
}, "categories" | "themes">, "strip", z.ZodTypeAny, {
    description?: string | undefined;
    city?: string | undefined;
    state?: string | undefined;
    businessName?: string | undefined;
    gstin?: string | undefined;
    pincode?: string | undefined;
    addressLine?: string | undefined;
    bankAccountDetails?: {
        accountName: string;
        accountNumber: string;
        ifscCode: string;
    } | undefined;
}, {
    description?: string | undefined;
    city?: string | undefined;
    state?: string | undefined;
    businessName?: string | undefined;
    gstin?: string | undefined;
    pincode?: string | undefined;
    addressLine?: string | undefined;
    bankAccountDetails?: {
        accountName: string;
        accountNumber: string;
        ifscCode: string;
    } | undefined;
}>;
export type UpdateVendorDto = z.infer<typeof updateVendorSchema>;
export declare const availabilitySlotSchema: z.ZodObject<{
    from: z.ZodString;
    to: z.ZodString;
}, "strip", z.ZodTypeAny, {
    from: string;
    to: string;
}, {
    from: string;
    to: string;
}>;
export declare const setAvailabilitySchema: z.ZodObject<{
    isTemplate: z.ZodBoolean;
    dayOfWeek: z.ZodOptional<z.ZodNumber>;
    date: z.ZodOptional<z.ZodString>;
    isBlocked: z.ZodDefault<z.ZodBoolean>;
    slots: z.ZodDefault<z.ZodArray<z.ZodObject<{
        from: z.ZodString;
        to: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        from: string;
        to: string;
    }, {
        from: string;
        to: string;
    }>, "many">>;
}, "strip", z.ZodTypeAny, {
    isTemplate: boolean;
    isBlocked: boolean;
    slots: {
        from: string;
        to: string;
    }[];
    date?: string | undefined;
    dayOfWeek?: number | undefined;
}, {
    isTemplate: boolean;
    date?: string | undefined;
    dayOfWeek?: number | undefined;
    isBlocked?: boolean | undefined;
    slots?: {
        from: string;
        to: string;
    }[] | undefined;
}>;
export type SetAvailabilityDto = z.infer<typeof setAvailabilitySchema>;
