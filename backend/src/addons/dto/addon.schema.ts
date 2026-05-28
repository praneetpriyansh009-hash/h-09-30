import { z } from 'zod';

export const createAddonSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().min(1, 'Description is required'),
  imageUrl: z.string().url('Image URL must be a valid URL'),
  price: z.number().min(0, 'Price must be non-negative'),
  categorySlug: z.string().min(1, 'Category slug is required'),
  isVendorFulfilled: z.boolean().optional(),
  vendorId: z.string().uuid().optional().nullable(),
  isActive: z.boolean().optional(),
  sortOrder: z.number().optional(),
});

export const updateAddonSchema = createAddonSchema.partial();

export type CreateAddonDto = z.infer<typeof createAddonSchema>;
export type UpdateAddonDto = z.infer<typeof updateAddonSchema>;
