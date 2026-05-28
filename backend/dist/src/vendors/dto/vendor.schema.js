"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setAvailabilitySchema = exports.availabilitySlotSchema = exports.updateVendorSchema = exports.registerVendorSchema = void 0;
const zod_1 = require("zod");
exports.registerVendorSchema = zod_1.z.object({
    businessName: zod_1.z.string().min(2),
    description: zod_1.z.string().min(10),
    gstin: zod_1.z.string().optional(),
    city: zod_1.z.string().min(2),
    state: zod_1.z.string().min(2),
    pincode: zod_1.z.string().min(5),
    addressLine: zod_1.z.string().min(5),
    categories: zod_1.z.array(zod_1.z.string().uuid()),
    themes: zod_1.z.array(zod_1.z.string().uuid()),
    bankAccountDetails: zod_1.z.object({
        accountName: zod_1.z.string(),
        accountNumber: zod_1.z.string(),
        ifscCode: zod_1.z.string(),
    }).optional(),
});
exports.updateVendorSchema = exports.registerVendorSchema.partial().omit({ categories: true, themes: true });
exports.availabilitySlotSchema = zod_1.z.object({
    from: zod_1.z.string().regex(/^([01]\d|2[0-3]):?([0-5]\d)$/),
    to: zod_1.z.string().regex(/^([01]\d|2[0-3]):?([0-5]\d)$/),
});
exports.setAvailabilitySchema = zod_1.z.object({
    isTemplate: zod_1.z.boolean(),
    dayOfWeek: zod_1.z.number().min(0).max(6).optional(),
    date: zod_1.z.string().datetime().optional(),
    isBlocked: zod_1.z.boolean().default(false),
    slots: zod_1.z.array(exports.availabilitySlotSchema).default([]),
});
//# sourceMappingURL=vendor.schema.js.map