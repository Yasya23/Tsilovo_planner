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
exports.TaskService = void 0;
const common_1 = require("@nestjs/common");
const nestjs_typegoose_1 = require("nestjs-typegoose");
const tasks_model_1 = require("../../models/tasks.model");
const mongoose_1 = require("mongoose");
let TaskService = class TaskService {
    constructor(taskModel) {
        this.taskModel = taskModel;
    }
    async getTasksByGoalIdsAndDateRange(goalIds, startDate, endDate) {
        return await this.taskModel
            .find({
            goalId: { $in: goalIds.map((id) => new mongoose_1.Types.ObjectId(id)) },
            date: { $gte: startDate, $lte: endDate },
        })
            .select('goalId title date isCompleted')
            .exec();
    }
    async getUserTasksForStatistic(userId, startDate, endDate) {
        const tasks = await this.taskModel
            .find({
            userId: userId,
            isCompleted: true,
            date: { $gte: startDate, $lte: endDate },
        })
            .select('_id title goalId')
            .populate({
            path: 'goalId',
            select: '_id emoji',
        })
            .exec();
        return tasks;
    }
    async create(userId, dto) {
        if (!userId || !dto.goalId || !dto.title || !dto.date) {
            throw new common_1.BadRequestException('Missing required fields');
        }
        return await this.taskModel.create({
            ...dto,
            userId: new mongoose_1.Types.ObjectId(userId),
            goalId: new mongoose_1.Types.ObjectId(dto.goalId),
        });
    }
    async update(dto) {
        const task = await this.taskModel.findByIdAndUpdate(dto._id, dto, {
            new: true,
            runValidators: true,
        });
        if (!task) {
            throw new common_1.NotFoundException(`Task with id ${dto._id} not found`);
        }
        return task;
    }
    async delete(taskId) {
        const task = await this.taskModel.findByIdAndDelete(taskId);
        if (!task) {
            throw new common_1.NotFoundException(`Task with id ${taskId} not found`);
        }
        return task;
    }
};
exports.TaskService = TaskService;
exports.TaskService = TaskService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, nestjs_typegoose_1.InjectModel)(tasks_model_1.TaskModel)),
    __metadata("design:paramtypes", [Object])
], TaskService);
//# sourceMappingURL=tasks.service.js.map