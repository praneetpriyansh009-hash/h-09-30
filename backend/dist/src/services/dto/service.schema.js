"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateServiceSchema = exports.createServiceSchema = void 0;
const zod_1 = require("zod");
exports.createServiceSchema = zod_1.z.object({
    categoryId: zod_1.z.string().uuid(),
    title: zod_1.z.string().min(3),
    description: zod_1.z.string().min(10),
    basePrice: zod_1.z.number().min(0),
    priceUnit: zod_1.z.string(),
    maxCapacity: zod_1.z.number().positive().optional(),
    photos: zod_1.z.array(zod_1.z.string().url()).min(1),
    tags: zod_1.z.array(zod_1.z.string()).default([]),
});
exports.updateServiceSchema = exports.createServiceSchema.partial();
//# sourceMappingURL=service.schema.js.map