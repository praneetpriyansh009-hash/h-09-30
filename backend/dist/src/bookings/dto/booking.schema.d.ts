import { z } from 'zod';
export declare const createBookingSchema: z.ZodObject<{
    bundleId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    bundleId: string;
}, {
    bundleId: string;
}>;
export type CreateBookingDto = z.infer<typeof createBookingSchema>;
export declare const submitReviewSchema: z.ZodObject<{
    rating: z.ZodNumber;
    reviewText: z.ZodString;
}, "strip", z.ZodTypeAny, {
    rating: number;
    reviewText: string;
}, {
    rating: number;
    reviewText: string;
}>;
export type SubmitReviewDto = z.infer<typeof submitReviewSchema>;
