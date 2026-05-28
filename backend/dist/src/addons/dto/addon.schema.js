"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateAddonSchema = exports.createAddonSchema = void 0;
const zod_1 = require("zod");
exports.createAddonSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, 'Name is required'),
    description: zod_1.z.string().min(1, 'Description is required'),
    imageUrl: zod_1.z.string().url('Image URL must be a valid URL'),
    price: zod_1.z.number().min(0, 'Price must be non-negative'),
    categorySlug: zod_1.z.string().min(1, 'Category slug is required'),
    isVendorFulfilled: zod_1.z.boolean().optional(),
    vendorId: zod_1.z.string().uuid().optional().nullable(),
    isActive: zod_1.z.boolean().optional(),
    sortOrder: zod_1.z.number().optional(),
});
exports.updateAddonSchema = exports.createAddonSchema.partial();
//# sourceMappingURL=addon.schema.js.map