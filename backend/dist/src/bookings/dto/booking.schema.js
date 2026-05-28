"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.submitReviewSchema = exports.createBookingSchema = void 0;
const zod_1 = require("zod");
exports.createBookingSchema = zod_1.z.object({
    bundleId: zod_1.z.string().uuid(),
});
exports.submitReviewSchema = zod_1.z.object({
    rating: zod_1.z.number().int().min(1).max(5),
    reviewText: zod_1.z.string().min(5),
});
//# sourceMappingURL=booking.schema.js.map