"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCategorySchema = exports.createCategorySchema = void 0;
const zod_1 = require("zod");
exports.createCategorySchema = zod_1.z.object({
    name: zod_1.z.string().min(1, 'Name is required'),
    slug: zod_1.z.string().min(1, 'Slug is required'),
    iconUrl: zod_1.z.string().url('Icon URL must be a valid URL'),
    description: zod_1.z.string().min(1, 'Description is required'),
    defaultCommissionRate: zod_1.z.number().min(0).max(100),
});
exports.updateCategorySchema = exports.createCategorySchema.partial();
//# sourceMappingURL=category.schema.js.map