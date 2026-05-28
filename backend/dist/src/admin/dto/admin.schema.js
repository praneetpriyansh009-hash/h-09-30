"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setCommissionSchema = void 0;
const zod_1 = require("zod");
exports.setCommissionSchema = zod_1.z.object({
    rate: zod_1.z.number().min(0).max(1),
});
//# sourceMappingURL=admin.schema.js.map