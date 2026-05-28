import { z } from 'zod';

export const createCategorySchema = z.object({
  name: z.string().min(1, 'Name is required'),
  slug: z.string().min(1, 'Slug is required'),
  iconUrl: z.string().url('Icon URL must be a valid URL'),
  description: z.string().min(1, 'Description is required'),
  defaultCommissionRate: z.number().min(0).max(100),
});

export const updateCategorySchema = createCategorySchema.partial();

export type CreateCategoryDto = z.infer<typeof createCategorySchema>;
export type UpdateCategoryDto = z.infer<typeof updateCategorySchema>;
