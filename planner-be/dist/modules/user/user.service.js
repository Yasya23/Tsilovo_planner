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
var UserService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const goals_service_1 = require("../goals/goals.service");
const mail_service_1 = require("../mail/mail.service");
const statistics_service_1 = require("../statistics/statistics.service");
const tasks_service_1 = require("../tasks/tasks.service");
const user_model_1 = require("./model/user.model");
const common_1 = require("@nestjs/common");
const common_2 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const schedule_1 = require("@nestjs/schedule");
const bcryptjs_1 = require("bcryptjs");
const jsonwebtoken_1 = require("jsonwebtoken");
const nestjs_typegoose_1 = require("nestjs-typegoose");
let UserService = UserService_1 = class UserService {
    constructor(userModel, configService, mailService, goalsService, tasksService, statisticsService) {
        this.userModel = userModel;
        this.configService = configService;
        this.mailService = mailService;
        this.goalsService = goalsService;
        this.tasksService = tasksService;
        this.statisticsService = statisticsService;
        this.logger = new common_2.Logger(UserService_1.name);
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
    async getProfile(id) {
        const user = await this.userModel.findById(id).exec();
        if (!user)
            throw new common_1.NotFoundException('User not found');
        return {
            name: user.name,
            email: user.email,
            image: user.image,
            provider: user.provider,
        };
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
        user.dataChangedAt = new Date();
        await user.save();
        this.mailService.sendEmail({
            to: user.email,
            subject: 'password has changed',
            locale: locale,
            name: user.name,
        });
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
        const oldEmail = user.email;
        user.email = userDto.email;
        user.oldEmail = oldEmail;
        user.dataChangedAt = new Date();
        await user.save();
        this.mailService.sendEmail({
            to: oldEmail,
            subject: 'email has changed',
            locale: locale,
            name: user.name,
        });
    }
    async updateAvatar(userId, { image }) {
        const user = await this.userModel.findById(userId);
        if (!user)
            throw new common_1.NotFoundException('User not found');
        user.image = image;
        await user.save();
    }
    async deleteProfile(id, locale) {
        const user = await this.userModel.findById(id);
        if (!user)
            throw new common_1.NotFoundException('User not found');
        const token = this.generateActionToken(id, 'delete');
        await this.mailService.sendEmail({
            to: user.email,
            subject: 'account deletion confirmation',
            token: token,
            locale: locale,
            name: user.name,
        });
    }
    async forgotPassword({ email }, locale) {
        const user = await this.userModel.findOne({ email });
        if (!user)
            throw new common_1.NotFoundException('User not found');
        if (user.provider === 'google')
            throw new common_1.BadRequestException('User with google account cannot reset password');
        const id = user._id.toString();
        const token = this.generateActionToken(id, 'reset');
        await this.mailService.sendEmail({
            to: email,
            subject: 'reset password',
            token: token,
            locale: locale,
            name: user.name,
        });
    }
    async resetPasswordWithToken(token, { password }, locale) {
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
        user.password = await (0, bcryptjs_1.hash)(password, salt);
        user.dataChangedAt = new Date();
        await user.save();
        this.mailService.sendEmail({
            to: user.email,
            subject: 'password has changed',
            locale: locale,
            name: user.name,
        });
    }
    async deleteAccountWithToken(token, locale) {
        const payload = (0, jsonwebtoken_1.verify)(token, this.configService.get('JWT_SECRET'));
        if (payload.type !== 'delete')
            throw new common_1.BadRequestException('Invalid token');
        const user = await this.userModel.findById(payload.id);
        if (!user)
            throw new common_1.NotFoundException('User not found');
        await this.userModel.findByIdAndUpdate(user._id, {
            isActive: false,
            deletedAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            dataChangedAt: new Date(),
        });
        this.mailService.sendEmail({
            to: user.email,
            subject: 'account was deleted',
            locale: locale,
            name: user.name,
        });
    }
    generateActionToken(userId, action) {
        const payload = { id: userId, type: action };
        const secret = this.configService.get('JWT_SECRET');
        return (0, jsonwebtoken_1.sign)(payload, secret, { expiresIn: '15m' });
    }
    async handleDeleteCron() {
        this.logger.log('Running weekly user deletion cron job');
        const users = await this.userModel.find({
            isActive: false,
            deletedAt: { $lte: new Date() },
        });
        const results = await Promise.allSettled(users.map(async (user) => {
            const userId = user._id.toString();
            await this.statisticsService.deleteStatistics(userId);
            await this.tasksService.deleteAllTasks(userId);
            await this.goalsService.deleteAllGoals(userId);
            await this.userModel.findByIdAndDelete(userId);
            return userId;
        }));
        results.forEach((result, index) => {
            const userId = users[index]._id.toString();
            if (result.status === 'fulfilled') {
                this.logger.log(`Successfully deleted user ${userId}`);
            }
            else {
                this.logger.error(`Failed to delete user ${userId}: ${result.reason}`);
            }
        });
    }
};
exports.UserService = UserService;
__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_WEEK),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserService.prototype, "handleDeleteCron", null);
exports.UserService = UserService = UserService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, nestjs_typegoose_1.InjectModel)(user_model_1.UserModel)),
    __metadata("design:paramtypes", [Object, config_1.ConfigService,
        mail_service_1.MailService,
        goals_service_1.GoalsService,
        tasks_service_1.TaskService,
        statistics_service_1.StatisticsService])
], UserService);
//# sourceMappingURL=user.service.js.map