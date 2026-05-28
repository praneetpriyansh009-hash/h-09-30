import { z } from 'zod';

export const createOrderSchema = z.object({
  bundleId: z.string().uuid(),
});
export type CreateOrderDto = z.infer<typeof createOrderSchema>;

export const verifyPaymentSchema = z.object({
  razorpayOrderId: z.string(),
  razorpayPaymentId: z.string(),
  razorpaySignature: z.string(),
});
export type VerifyPaymentDto = z.infer<typeof verifyPaymentSchema>;

export const createSplitSchema = z.object({
  payerEmail: z.string().email(),
  payerName: z.string().optional(),
  payerPhone: z.string().optional(),
});
export type CreateSplitDto = z.infer<typeof createSplitSchema>;

export const paySplitSchema = z.object({
  paymentMethod: z.string().default('mock_card'), // Mock payment details
});
export type PaySplitDto = z.infer<typeof paySplitSchema>;
