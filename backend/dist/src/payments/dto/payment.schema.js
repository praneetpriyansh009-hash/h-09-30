"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paySplitSchema = exports.createSplitSchema = exports.verifyPaymentSchema = exports.createOrderSchema = void 0;
const zod_1 = require("zod");
exports.createOrderSchema = zod_1.z.object({
    bundleId: zod_1.z.string().uuid(),
});
exports.verifyPaymentSchema = zod_1.z.object({
    razorpayOrderId: zod_1.z.string(),
    razorpayPaymentId: zod_1.z.string(),
    razorpaySignature: zod_1.z.string(),
});
exports.createSplitSchema = zod_1.z.object({
    payerEmail: zod_1.z.string().email(),
    payerName: zod_1.z.string().optional(),
    payerPhone: zod_1.z.string().optional(),
});
exports.paySplitSchema = zod_1.z.object({
    paymentMethod: zod_1.z.string().default('mock_card'),
});
//# sourceMappingURL=payment.schema.js.map