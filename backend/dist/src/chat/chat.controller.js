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
exports.ChatController = void 0;
const common_1 = require("@nestjs/common");
const chat_service_1 = require("./chat.service");
const chat_schema_1 = require("./dto/chat.schema");
const zod_validation_pipe_1 = require("../common/pipes/zod-validation.pipe");
const jwt_auth_guard_1 = require("../common/guards/jwt-auth.guard");
let ChatController = class ChatController {
    chatService;
    constructor(chatService) {
        this.chatService = chatService;
    }
    getThread(req, bundleId, vendorId) {
        return this.chatService.getThread(bundleId, vendorId, req.user.sub, req.user.role);
    }
    sendMessage(req, bundleId, vendorId, data) {
        return this.chatService.sendMessage(bundleId, vendorId, req.user.sub, req.user.role, data);
    }
    markAsRead(req, id) {
        return this.chatService.markAsRead(id, req.user.sub, req.user.role);
    }
};
exports.ChatController = ChatController;
__decorate([
    (0, common_1.Get)('bundles/:bundleId/vendor/:vendorId'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('bundleId')),
    __param(2, (0, common_1.Param)('vendorId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", void 0)
], ChatController.prototype, "getThread", null);
__decorate([
    (0, common_1.Post)('bundles/:bundleId/vendor/:vendorId'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('bundleId')),
    __param(2, (0, common_1.Param)('vendorId')),
    __param(3, (0, common_1.Body)(new zod_validation_pipe_1.ZodValidationPipe(chat_schema_1.sendMessageSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String, Object]),
    __metadata("design:returntype", void 0)
], ChatController.prototype, "sendMessage", null);
__decorate([
    (0, common_1.Patch)('messages/:id/read'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], ChatController.prototype, "markAsRead", null);
exports.ChatController = ChatController = __decorate([
    (0, common_1.Controller)('chat'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [chat_service_1.ChatService])
], ChatController);
//# sourceMappingURL=chat.controller.js.map