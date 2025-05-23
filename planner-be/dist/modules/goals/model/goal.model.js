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
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoalModel = void 0;
const typegoose_1 = require("@typegoose/typegoose");
const defaultClasses_1 = require("@typegoose/typegoose/lib/defaultClasses");
const mongoose_1 = require("mongoose");
const tasks_model_1 = require("../../tasks/model/tasks.model");
class GoalModel extends defaultClasses_1.TimeStamps {
}
exports.GoalModel = GoalModel;
__decorate([
    (0, typegoose_1.prop)({ required: true }),
    __metadata("design:type", String)
], GoalModel.prototype, "title", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], GoalModel.prototype, "userId", void 0);
__decorate([
    (0, typegoose_1.prop)({ ref: () => tasks_model_1.TaskModel }),
    __metadata("design:type", Array)
], GoalModel.prototype, "tasks", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", String)
], GoalModel.prototype, "emoji", void 0);
__decorate([
    (0, typegoose_1.prop)({ default: true }),
    __metadata("design:type", Boolean)
], GoalModel.prototype, "isActive", void 0);
//# sourceMappingURL=goal.model.js.map