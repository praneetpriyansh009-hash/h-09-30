"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.venueFiltersSchema = exports.updateSessionSchema = exports.createSessionSchema = void 0;
const zod_1 = require("zod");
exports.createSessionSchema = zod_1.z.object({});
exports.updateSessionSchema = zod_1.z.object({
    currentStep: zod_1.z.number().min(1).max(7).optional(),
    data: zod_1.z.record(zod_1.z.any()).optional(),
});
exports.venueFiltersSchema = zod_1.z.object({
    themeId: zod_1.z.string().uuid().optional(),
    city: zod_1.z.string().optional(),
    date: zod_1.z.string().optional(),
    guests: zod_1.z.string().regex(/^\d+$/).transform(Number).optional(),
    budgetMax: zod_1.z.string().regex(/^\d+$/).transform(Number).optional(),
});
//# sourceMappingURL=wizard.schema.js.map