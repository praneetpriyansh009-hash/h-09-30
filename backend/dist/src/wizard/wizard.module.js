"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WizardModule = void 0;
const common_1 = require("@nestjs/common");
const wizard_service_1 = require("./wizard.service");
const wizard_controller_1 = require("./wizard.controller");
let WizardModule = class WizardModule {
};
exports.WizardModule = WizardModule;
exports.WizardModule = WizardModule = __decorate([
    (0, common_1.Module)({
        controllers: [wizard_controller_1.WizardController],
        providers: [wizard_service_1.WizardService],
        exports: [wizard_service_1.WizardService],
    })
], WizardModule);
//# sourceMappingURL=wizard.module.js.map