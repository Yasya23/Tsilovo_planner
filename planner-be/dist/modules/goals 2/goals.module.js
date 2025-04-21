"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoalsModule = void 0;
const common_1 = require("@nestjs/common");
const goals_controller_1 = require("./goals.controller");
const goals_service_1 = require("./goals.service");
const nestjs_typegoose_1 = require("nestjs-typegoose");
const config_1 = require("@nestjs/config");
const goal_model_1 = require("../../models/goal.model");
const date_module_1 = require("../date/date.module");
const tasks_module_1 = require("../tasks/tasks.module");
let GoalsModule = class GoalsModule {
};
exports.GoalsModule = GoalsModule;
exports.GoalsModule = GoalsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            nestjs_typegoose_1.TypegooseModule.forFeature([
                {
                    typegooseClass: goal_model_1.GoalModel,
                    schemaOptions: {
                        collection: 'Goals',
                    },
                },
            ]),
            config_1.ConfigModule,
            tasks_module_1.TaskModule,
            date_module_1.DateModule,
        ],
        providers: [goals_service_1.GoalsService],
        controllers: [goals_controller_1.GoalsController],
    })
], GoalsModule);
//# sourceMappingURL=goals.module.js.map