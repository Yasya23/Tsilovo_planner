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
exports.TaskController = void 0;
const dto_1 = require("./dto");
const tasks_service_1 = require("./tasks.service");
const auth_decorator_1 = require("../auth/decorator/auth.decorator");
const user_decorator_1 = require("../user/decorator/user.decorator");
const common_1 = require("@nestjs/common");
let TaskController = class TaskController {
    constructor(taskService) {
        this.taskService = taskService;
    }
    async create(userId, dto) {
        await this.taskService.create(userId, dto);
    }
    async update(dto) {
        await this.taskService.update(dto);
    }
    async delete(taskId) {
        await this.taskService.delete(taskId);
    }
};
exports.TaskController = TaskController;
__decorate([
    (0, common_1.Post)(),
    (0, auth_decorator_1.Auth)(),
    __param(0, (0, user_decorator_1.User)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dto_1.CreateTaskDto]),
    __metadata("design:returntype", Promise)
], TaskController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(),
    (0, auth_decorator_1.Auth)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.TaskDto]),
    __metadata("design:returntype", Promise)
], TaskController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(),
    (0, auth_decorator_1.Auth)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TaskController.prototype, "delete", null);
exports.TaskController = TaskController = __decorate([
    (0, common_1.Controller)('tasks'),
    __metadata("design:paramtypes", [tasks_service_1.TaskService])
], TaskController);
//# sourceMappingURL=tasks.controller.js.map