import { z } from 'zod';

export const createThemeSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  slug: z.string().min(1, 'Slug is required'),
  description: z.string().min(1, 'Description is required'),
  coverImageUrl: z.string().url('Cover Image URL must be a valid URL'),
  moodKeywords: z.string(), // expected to be JSON string
  isActive: z.boolean().optional(),
  sortOrder: z.number().optional(),
});

export const updateThemeSchema = createThemeSchema.partial();

export type CreateThemeDto = z.infer<typeof createThemeSchema>;
export type UpdateThemeDto = z.infer<typeof updateThemeSchema>;
