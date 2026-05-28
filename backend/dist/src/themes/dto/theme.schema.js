"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateThemeSchema = exports.createThemeSchema = void 0;
const zod_1 = require("zod");
exports.createThemeSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, 'Name is required'),
    slug: zod_1.z.string().min(1, 'Slug is required'),
    description: zod_1.z.string().min(1, 'Description is required'),
    coverImageUrl: zod_1.z.string().url('Cover Image URL must be a valid URL'),
    moodKeywords: zod_1.z.string(),
    isActive: zod_1.z.boolean().optional(),
    sortOrder: zod_1.z.number().optional(),
});
exports.updateThemeSchema = exports.createThemeSchema.partial();
//# sourceMappingURL=theme.schema.js.map