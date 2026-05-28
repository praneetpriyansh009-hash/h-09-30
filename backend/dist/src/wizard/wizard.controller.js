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
exports.WizardController = void 0;
const common_1 = require("@nestjs/common");
const wizard_service_1 = require("./wizard.service");
const wizard_schema_1 = require("./dto/wizard.schema");
const zod_validation_pipe_1 = require("../common/pipes/zod-validation.pipe");
const public_decorator_1 = require("../common/decorators/public.decorator");
let WizardController = class WizardController {
    wizardService;
    constructor(wizardService) {
        this.wizardService = wizardService;
    }
    createSession(req) {
        const userId = req.user?.sub;
        return this.wizardService.createSession(userId);
    }
    getSession(key) {
        return this.wizardService.getSession(key);
    }
    updateSession(key, data) {
        return this.wizardService.updateSession(key, data);
    }
    deleteSession(key) {
        return this.wizardService.deleteSession(key);
    }
    getThemes(occasionType) {
        return this.wizardService.getThemes(occasionType);
    }
    getVenues(query) {
        const filters = wizard_schema_1.venueFiltersSchema.parse(query);
        return this.wizardService.getVenues(filters);
    }
    getAddons(categorySlug) {
        return this.wizardService.getAddons(categorySlug);
    }
    getTransport(city) {
        return this.wizardService.getTransport(city);
    }
};
exports.WizardController = WizardController;
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Post)('session'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], WizardController.prototype, "createSession", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)('session/:key'),
    __param(0, (0, common_1.Param)('key')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], WizardController.prototype, "getSession", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Patch)('session/:key'),
    __param(0, (0, common_1.Param)('key')),
    __param(1, (0, common_1.Body)(new zod_validation_pipe_1.ZodValidationPipe(wizard_schema_1.updateSessionSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], WizardController.prototype, "updateSession", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Delete)('session/:key'),
    __param(0, (0, common_1.Param)('key')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], WizardController.prototype, "deleteSession", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)('themes'),
    __param(0, (0, common_1.Query)('occasionType')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], WizardController.prototype, "getThemes", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)('venues'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], WizardController.prototype, "getVenues", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)('addons'),
    __param(0, (0, common_1.Query)('categorySlug')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], WizardController.prototype, "getAddons", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)('transport'),
    __param(0, (0, common_1.Query)('city')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], WizardController.prototype, "getTransport", null);
exports.WizardController = WizardController = __decorate([
    (0, common_1.Controller)('wizard'),
    __metadata("design:paramtypes", [wizard_service_1.WizardService])
], WizardController);
//# sourceMappingURL=wizard.controller.js.map