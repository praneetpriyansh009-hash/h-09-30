import { z } from 'zod';

export const createSessionSchema = z.object({}); // Empty for now, just an init

export const updateSessionSchema = z.object({
  currentStep: z.number().min(1).max(7).optional(),
  data: z.record(z.any()).optional(), // Any valid JSON data representing step state
});
export type UpdateSessionDto = z.infer<typeof updateSessionSchema>;

export const venueFiltersSchema = z.object({
  themeId: z.string().uuid().optional(),
  city: z.string().optional(),
  date: z.string().optional(),
  guests: z.string().regex(/^\d+$/).transform(Number).optional(),
  budgetMax: z.string().regex(/^\d+$/).transform(Number).optional(),
});
