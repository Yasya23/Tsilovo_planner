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
const resend_service_1 = require("../resend/resend.service");
const user_model_1 = require("./model/user.model");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const bcryptjs_1 = require("bcryptjs");
const jsonwebtoken_1 = require("jsonwebtoken");
const nestjs_typegoose_1 = require("nestjs-typegoose");
let UserService = class UserService {
    constructor(userModel, configService, resendService) {
        this.userModel = userModel;
        this.configService = configService;
        this.resendService = resendService;
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
    async findByEmail(email) {
        return this.userModel.findOne({ email }).exec();
    }
    async create(userData) {
        const user = new this.userModel(userData);
        return user.save();
    }
    async updateName(userId, userDto) {
        const user = await this.userModel.findById(userId);
        if (!user)
            throw new common_1.NotFoundException('User not found');
        user.name = userDto.name;
        await user.save();
    }
    async updatePassword(userId, userDto, locale) {
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
    async updateEmail(userId, userDto, locale) {
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
    async deleteProfile(id) {
    }
    async forgotPassword({ email }, locale) {
        const user = await this.userModel.findOne({ email });
        if (!user)
            throw new common_1.NotFoundException('User not found');
        const id = user._id.toString();
        const token = this.generateActionToken(id, 'reset');
        await this.resendService.sendEmail({
            to: email,
            subject: 'reset password',
            token: token,
            locale: locale,
            name: user.name,
        });
    }
    async resetPasswordWithToken(token, newPassword, locale) {
        const secret = this.configService.get('JWT_SECRET');
        let payload;
        try {
            payload = (0, jsonwebtoken_1.verify)(token, secret);
        }
        catch {
            throw new common_1.BadRequestException('Invalid or expired token');
        }
        if (payload.type !== 'reset') {
            throw new common_1.BadRequestException('Invalid token type');
        }
        const user = await this.userModel.findById(payload.id);
        if (!user)
            throw new common_1.NotFoundException('User not found');
        const salt = await (0, bcryptjs_1.genSalt)(Number(this.configService.get('PASSWORD_SALT')));
        user.password = await (0, bcryptjs_1.hash)(newPassword, salt);
        await user.save();
    }
    async deleteAccountWithToken(token, locale) {
        const payload = (0, jsonwebtoken_1.verify)(token, this.configService.get('JWT_SECRET'));
        if (payload.type !== 'delete')
            throw new common_1.BadRequestException('Invalid token');
        const date = new Date();
        await this.userModel.findByIdAndUpdate({ isAcive: false, deletedAt: date });
    }
    generateActionToken(userId, action) {
        const payload = { id: userId, type: action };
        const secret = this.configService.get('JWT_SECRET');
        return (0, jsonwebtoken_1.sign)(payload, secret, { expiresIn: '15m' });
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, nestjs_typegoose_1.InjectModel)(user_model_1.UserModel)),
    __metadata("design:paramtypes", [Object, config_1.ConfigService,
        resend_service_1.ResendService])
], UserService);
//# sourceMappingURL=user.service.js.map