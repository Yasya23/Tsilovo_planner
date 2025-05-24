"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskModule = void 0;
const statistics_module_1 = require("../statistics/statistics.module");
const tasks_model_1 = require("./model/tasks.model");
const tasks_controller_1 = require("./tasks.controller");
const tasks_service_1 = require("./tasks.service");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const nestjs_typegoose_1 = require("nestjs-typegoose");
let TaskModule = class TaskModule {
};
exports.TaskModule = TaskModule;
exports.TaskModule = TaskModule = __decorate([
    (0, common_1.Module)({
        imports: [
            nestjs_typegoose_1.TypegooseModule.forFeature([
                {
                    typegooseClass: tasks_model_1.TaskModel,
                    schemaOptions: {
                        collection: 'Tasks',
                    },
                },
            ]),
            config_1.ConfigModule,
            statistics_module_1.StatisticsModule,
        ],
        providers: [tasks_service_1.TaskService],
        controllers: [tasks_controller_1.TaskController],
        exports: [tasks_service_1.TaskService],
    })
], TaskModule);
//# sourceMappingURL=tasks.module.js.map