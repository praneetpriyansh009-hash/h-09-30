import { z } from 'zod';

export const createBundleSchema = z.object({
  title: z.string().min(1),
  occasionType: z.string(),
  themeId: z.string().uuid().optional(),
  partyDate: z.string().datetime(), // ISO 8601 string
  partyTime: z.string().regex(/^([01]\d|2[0-3]):?([0-5]\d)$/).optional(),
  guestCount: z.number().int().positive(),
  budgetMax: z.number().positive().optional(),
  city: z.string().min(1),
  
  // Initial items
  items: z.array(z.object({
    vendorServiceId: z.string().uuid(),
    quantity: z.number().int().positive().default(1),
    customNote: z.string().optional(),
  })).default([]),

  // Initial addons
  addOns: z.array(z.object({
    addOnItemId: z.string().uuid(),
    quantity: z.number().int().positive().default(1),
    customNote: z.string().optional(),
  })).default([])
});
export type CreateBundleDto = z.infer<typeof createBundleSchema>;

export const addBundleItemSchema = z.object({
  vendorServiceId: z.string().uuid(),
  quantity: z.number().int().positive().default(1),
  customNote: z.string().optional(),
});
export type AddBundleItemDto = z.infer<typeof addBundleItemSchema>;

export const addBundleAddOnSchema = z.object({
  addOnItemId: z.string().uuid(),
  quantity: z.number().int().positive().default(1),
  customNote: z.string().optional(),
});
export type AddBundleAddOnDto = z.infer<typeof addBundleAddOnSchema>;
