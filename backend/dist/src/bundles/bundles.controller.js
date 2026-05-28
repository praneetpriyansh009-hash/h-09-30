"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BundlesController = void 0;
const common_1 = require("@nestjs/common");
const bundles_service_1 = require("./bundles.service");
const bundle_schema_1 = require("./dto/bundle.schema");
const zod_validation_pipe_1 = require("../common/pipes/zod-validation.pipe");
const jwt_auth_guard_1 = require("../common/guards/jwt-auth.guard");
let BundlesController = class BundlesController {
    bundlesService;
    constructor(bundlesService) {
        this.bundlesService = bundlesService;
    }
    create(req, data) {
        return this.bundlesService.create(req.user.sub, data);
    }
    findOne(req, id) {
        return this.bundlesService.findOne(id, req.user.sub);
    }
    addItem(req, id, data) {
        return this.bundlesService.addItem(id, req.user.sub, data);
    }
    removeItem(req, id, itemId) {
        return this.bundlesService.removeItem(id, itemId, req.user.sub);
    }
    addAddOn(req, id, data) {
        return this.bundlesService.addAddOn(id, req.user.sub, data);
    }
    removeAddOn(req, id, addOnId) {
        return this.bundlesService.removeAddOn(id, addOnId, req.user.sub);
    }
    checkout(req, id) {
        return this.bundlesService.checkout(id, req.user.sub);
    }
};
exports.BundlesController = BundlesController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)(new zod_validation_pipe_1.ZodValidationPipe(bundle_schema_1.createBundleSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], BundlesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], BundlesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(':id/items'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)(new zod_validation_pipe_1.ZodValidationPipe(bundle_schema_1.addBundleItemSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", void 0)
], BundlesController.prototype, "addItem", null);
__decorate([
    (0, common_1.Delete)(':id/items/:itemId'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Param)('itemId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", void 0)
], BundlesController.prototype, "removeItem", null);
__decorate([
    (0, common_1.Post)(':id/addons'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)(new zod_validation_pipe_1.ZodValidationPipe(bundle_schema_1.addBundleAddOnSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", void 0)
], BundlesController.prototype, "addAddOn", null);
__decorate([
    (0, common_1.Delete)(':id/addons/:addOnId'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Param)('addOnId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", void 0)
], BundlesController.prototype, "removeAddOn", null);
__decorate([
    (0, common_1.Post)(':id/checkout'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], BundlesController.prototype, "checkout", null);
exports.BundlesController = BundlesController = __decorate([
    (0, common_1.Controller)('bundles'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [bundles_service_1.BundlesService])
], BundlesController);
//# sourceMappingURL=bundles.controller.js.map