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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const auth_decorator_1 = require("../../decorators/auth.decorator");
const user_decorator_1 = require("../../decorators/user.decorator");
const dto_1 = require("../../typing/dto");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    async getUserProfile(id) {
        return this.userService.getByID(id);
    }
    async getUser(id) {
        return this.userService.getByID(id);
    }
    async update(id, dto) {
        return await this.userService.update(id, dto);
    }
    async delete(id) {
        await this.userService.delete(id);
        return { message: 'Profile deleted successfully' };
    }
};
exports.UserController = UserController;
__decorate([
    (0, common_1.Get)('profile'),
    (0, auth_decorator_1.Auth)(),
    __param(0, (0, user_decorator_1.User)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUserProfile", null);
__decorate([
    (0, common_1.Get)(),
    (0, auth_decorator_1.Auth)(),
    __param(0, (0, user_decorator_1.User)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUser", null);
__decorate([
    (0, common_1.Put)('profile'),
    (0, auth_decorator_1.Auth)(),
    __param(0, (0, user_decorator_1.User)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dto_1.UpdateUserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, auth_decorator_1.Auth)(),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "delete", null);
exports.UserController = UserController = __decorate([
    (0, common_1.Controller)('user'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
//# sourceMappingURL=user.controller.js.map