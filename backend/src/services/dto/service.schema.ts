import { z } from 'zod';

export const createServiceSchema = z.object({
  categoryId: z.string().uuid(),
  title: z.string().min(3),
  description: z.string().min(10),
  basePrice: z.number().min(0),
  priceUnit: z.string(), // e.g. "per hour", "per event", "per plate"
  maxCapacity: z.number().positive().optional(),
  photos: z.array(z.string().url()).min(1),
  tags: z.array(z.string()).default([]),
});
export type CreateServiceDto = z.infer<typeof createServiceSchema>;

export const updateServiceSchema = createServiceSchema.partial();
export type UpdateServiceDto = z.infer<typeof updateServiceSchema>;
