import { z } from 'zod';

export const registerVendorSchema = z.object({
  businessName: z.string().min(2),
  description: z.string().min(10),
  gstin: z.string().optional(),
  city: z.string().min(2),
  state: z.string().min(2),
  pincode: z.string().min(5),
  addressLine: z.string().min(5),
  categories: z.array(z.string().uuid()),
  themes: z.array(z.string().uuid()),
  bankAccountDetails: z.object({
    accountName: z.string(),
    accountNumber: z.string(),
    ifscCode: z.string(),
  }).optional(),
});
export type RegisterVendorDto = z.infer<typeof registerVendorSchema>;

export const updateVendorSchema = registerVendorSchema.partial().omit({ categories: true, themes: true });
export type UpdateVendorDto = z.infer<typeof updateVendorSchema>;

export const availabilitySlotSchema = z.object({
  from: z.string().regex(/^([01]\d|2[0-3]):?([0-5]\d)$/),
  to: z.string().regex(/^([01]\d|2[0-3]):?([0-5]\d)$/),
});

export const setAvailabilitySchema = z.object({
  isTemplate: z.boolean(),
  dayOfWeek: z.number().min(0).max(6).optional(),
  date: z.string().datetime().optional(), // ISO string if specific date
  isBlocked: z.boolean().default(false),
  slots: z.array(availabilitySlotSchema).default([]),
});
export type SetAvailabilityDto = z.infer<typeof setAvailabilitySchema>;
