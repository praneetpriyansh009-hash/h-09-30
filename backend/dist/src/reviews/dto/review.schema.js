"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.replyReviewSchema = void 0;
const zod_1 = require("zod");
exports.replyReviewSchema = zod_1.z.object({
    replyText: zod_1.z.string().min(5),
});
//# sourceMappingURL=review.schema.js.map