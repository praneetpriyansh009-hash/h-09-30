import { z } from 'zod';

export const createBookingSchema = z.object({
  bundleId: z.string().uuid(),
});
export type CreateBookingDto = z.infer<typeof createBookingSchema>;

export const submitReviewSchema = z.object({
  rating: z.number().int().min(1).max(5),
  reviewText: z.string().min(5),
});
export type SubmitReviewDto = z.infer<typeof submitReviewSchema>;
