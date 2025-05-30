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
exports.AuthController = void 0;
const auth_service_1 = require("./auth.service");
const dto_1 = require("./dto");
const auth_1 = require("./helpers/auth");
const mail_service_1 = require("../mail/mail.service");
const locale_decorator_1 = require("../../shared/decorator/locale.decorator");
const common_1 = require("@nestjs/common");
const common_2 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const passport_1 = require("@nestjs/passport");
const throttler_1 = require("@nestjs/throttler");
let AuthController = class AuthController {
    constructor(authService, configService, MailService) {
        this.authService = authService;
        this.configService = configService;
        this.MailService = MailService;
    }
    async login(dto, res) {
        const { accessToken, refreshToken } = await this.authService.login(dto);
        (0, auth_1.setAuthCookies)(res, accessToken, refreshToken);
        return {
            message: 'Login successful',
        };
    }
    async register(dto, locale, res) {
        const { accessToken, refreshToken, name, email } = await this.authService.register(dto);
        (0, auth_1.setAuthCookies)(res, accessToken, refreshToken);
        this.MailService.sendEmail({
            subject: 'welcome',
            to: email,
            name,
            locale,
        });
        return {
            message: 'Registration successful',
        };
    }
    logout(res) {
        (0, auth_1.clearAuthCookies)(res);
        return { message: 'Logged out successfully' };
    }
    async refresh(req, res) {
        try {
            const refreshToken = req.cookies?.refreshToken;
            if (!refreshToken) {
                (0, auth_1.clearAuthCookies)(res);
                throw new common_2.UnauthorizedException('Missing refresh token');
            }
            const { accessToken, refreshToken: newRefreshToken } = await this.authService.getNewTokens(refreshToken);
            (0, auth_1.setAuthCookies)(res, accessToken, newRefreshToken);
            return {
                message: 'Updated successful',
            };
        }
        catch (err) {
            (0, auth_1.clearAuthCookies)(res);
            console.error('Token refresh failed:', err);
            throw new common_2.UnauthorizedException('Refresh token invalid or expired');
        }
    }
    async googleAuth() { }
    async googleCallback(locale, req, res) {
        try {
            const { accessToken, refreshToken, name, email, isNewUser } = await this.authService.googleLogin(req.user);
            (0, auth_1.setAuthCookies)(res, accessToken, refreshToken);
            if (isNewUser) {
                this.MailService.sendEmail({
                    subject: 'welcome',
                    to: email,
                    name,
                    locale,
                });
            }
            res.redirect(`${this.configService.get('FRONTEND_URL')}/${locale}/planner`);
            return;
        }
        catch {
            res.redirect(`${this.configService.get('FRONTEND_URL')}/${locale}/login?error=oauth_failed`);
        }
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, throttler_1.Throttle)({ default: { limit: 5, ttl: 60000 } }),
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.AuthDto, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, throttler_1.Throttle)({ default: { limit: 5, ttl: 60000 } }),
    (0, common_1.Post)('register'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, locale_decorator_1.Locale)()),
    __param(2, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.RegistrationDto, String, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "register", null);
__decorate([
    (0, common_1.Post)('logout'),
    __param(0, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "logout", null);
__decorate([
    (0, throttler_1.Throttle)({ default: { limit: 5, ttl: 60000 } }),
    (0, common_1.Post)('access-token'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "refresh", null);
__decorate([
    (0, common_1.Get)('google'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('google')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "googleAuth", null);
__decorate([
    (0, common_1.Get)('google/callback'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('google')),
    __param(0, (0, locale_decorator_1.Locale)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "googleCallback", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        config_1.ConfigService,
        mail_service_1.MailService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map