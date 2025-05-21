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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const nestjs_typegoose_1 = require("nestjs-typegoose");
const user_model_1 = require("../../models/user.model");
const bcryptjs_1 = require("bcryptjs");
const config_1 = require("@nestjs/config");
let UserService = class UserService {
    constructor(userModel, configService) {
        this.userModel = userModel;
        this.configService = configService;
    }
    async getAllUsers() {
        const users = await this.userModel.find().exec();
        if (!users || users.length === 0) {
            throw new common_1.NotFoundException('Users not found');
        }
        return users;
    }
    async getByID(id) {
        const user = await this.userModel.findById(id).exec();
        if (!user)
            throw new common_1.NotFoundException('User not found');
        return user;
    }
    async updateName(userId, userDto) {
        const user = await this.userModel.findById(userId);
        if (!user)
            throw new common_1.NotFoundException('User not found');
        user.name = userDto.name;
        await user.save();
    }
    async updatePassword(userId, userDto) {
        const user = await this.userModel.findById(userId);
        if (!user)
            throw new common_1.NotFoundException('User not found');
        const isPasswordValid = await (0, bcryptjs_1.compare)(userDto.password, user.password);
        if (!isPasswordValid) {
            throw new common_1.BadRequestException('Old password is incorrect');
        }
        const saltHash = Number(this.configService.get('PASSWORD_SALT'));
        const salt = await (0, bcryptjs_1.genSalt)(saltHash);
        user.password = await (0, bcryptjs_1.hash)(userDto.newPassword, salt);
        await user.save();
    }
    async updateEmail(userId, userDto) {
        const user = await this.userModel.findById(userId);
        if (!user)
            throw new common_1.NotFoundException('User not found');
        const isEmailUnique = await this.userModel.findOne({
            email: userDto.email,
        });
        if (isEmailUnique) {
            throw new common_1.NotFoundException('This email address is already used');
        }
        const isPasswordValid = await (0, bcryptjs_1.compare)(userDto.password, user.password);
        if (!isPasswordValid) {
            throw new common_1.BadRequestException('Old password is incorrect');
        }
        user.email = userDto.email;
        await user.save();
    }
    async updateAvatar(userId, { image }) {
        const user = await this.userModel.findById(userId);
        if (!user)
            throw new common_1.NotFoundException('User not found');
        user.image = image;
        return await user.save();
    }
    async findByEmail(email) {
        return this.userModel.findOne({ email }).exec();
    }
    async create(userData) {
        const user = new this.userModel(userData);
        return user.save();
    }
    async deleteProfile(id) {
        await this.userModel.findByIdAndDelete(id).exec();
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, nestjs_typegoose_1.InjectModel)(user_model_1.UserModel)),
    __metadata("design:paramtypes", [Object, config_1.ConfigService])
], UserService);
//# sourceMappingURL=user.service.js.map