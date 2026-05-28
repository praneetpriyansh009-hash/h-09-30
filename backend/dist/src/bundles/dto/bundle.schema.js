"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addBundleAddOnSchema = exports.addBundleItemSchema = exports.createBundleSchema = void 0;
const zod_1 = require("zod");
exports.createBundleSchema = zod_1.z.object({
    title: zod_1.z.string().min(1),
    occasionType: zod_1.z.string(),
    themeId: zod_1.z.string().uuid().optional(),
    partyDate: zod_1.z.string().datetime(),
    partyTime: zod_1.z.string().regex(/^([01]\d|2[0-3]):?([0-5]\d)$/).optional(),
    guestCount: zod_1.z.number().int().positive(),
    budgetMax: zod_1.z.number().positive().optional(),
    city: zod_1.z.string().min(1),
    items: zod_1.z.array(zod_1.z.object({
        vendorServiceId: zod_1.z.string().uuid(),
        quantity: zod_1.z.number().int().positive().default(1),
        customNote: zod_1.z.string().optional(),
    })).default([]),
    addOns: zod_1.z.array(zod_1.z.object({
        addOnItemId: zod_1.z.string().uuid(),
        quantity: zod_1.z.number().int().positive().default(1),
        customNote: zod_1.z.string().optional(),
    })).default([])
});
exports.addBundleItemSchema = zod_1.z.object({
    vendorServiceId: zod_1.z.string().uuid(),
    quantity: zod_1.z.number().int().positive().default(1),
    customNote: zod_1.z.string().optional(),
});
exports.addBundleAddOnSchema = zod_1.z.object({
    addOnItemId: zod_1.z.string().uuid(),
    quantity: zod_1.z.number().int().positive().default(1),
    customNote: zod_1.z.string().optional(),
});
//# sourceMappingURL=bundle.schema.js.map