import { z } from 'zod';
export declare const createOrderSchema: z.ZodObject<{
    bundleId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    bundleId: string;
}, {
    bundleId: string;
}>;
export type CreateOrderDto = z.infer<typeof createOrderSchema>;
export declare const verifyPaymentSchema: z.ZodObject<{
    razorpayOrderId: z.ZodString;
    razorpayPaymentId: z.ZodString;
    razorpaySignature: z.ZodString;
}, "strip", z.ZodTypeAny, {
    razorpayOrderId: string;
    razorpayPaymentId: string;
    razorpaySignature: string;
}, {
    razorpayOrderId: string;
    razorpayPaymentId: string;
    razorpaySignature: string;
}>;
export type VerifyPaymentDto = z.infer<typeof verifyPaymentSchema>;
export declare const createSplitSchema: z.ZodObject<{
    payerEmail: z.ZodString;
    payerName: z.ZodOptional<z.ZodString>;
    payerPhone: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    payerEmail: string;
    payerName?: string | undefined;
    payerPhone?: string | undefined;
}, {
    payerEmail: string;
    payerName?: string | undefined;
    payerPhone?: string | undefined;
}>;
export type CreateSplitDto = z.infer<typeof createSplitSchema>;
export declare const paySplitSchema: z.ZodObject<{
    paymentMethod: z.ZodDefault<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    paymentMethod: string;
}, {
    paymentMethod?: string | undefined;
}>;
export type PaySplitDto = z.infer<typeof paySplitSchema>;
