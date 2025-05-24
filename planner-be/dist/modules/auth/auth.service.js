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
exports.AuthService = void 0;
const user_service_1 = require("../user/user.service");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const bcryptjs_1 = require("bcryptjs");
let AuthService = class AuthService {
    constructor(configService, jwtService, userService) {
        this.configService = configService;
        this.jwtService = jwtService;
        this.userService = userService;
    }
    async login(loginDto) {
        const user = await this.userService.findByEmail(loginDto.email);
        if (!user) {
            throw new common_1.UnauthorizedException('Invalid email or password');
        }
        const isPasswordValid = await (0, bcryptjs_1.compare)(loginDto.password, user.password);
        if (!isPasswordValid) {
            throw new common_1.UnauthorizedException('Invalid email or password');
        }
        const tokens = await this.createTokenPair(user.id);
        if (!tokens.accessToken || !tokens.refreshToken) {
            throw new common_1.UnauthorizedException('Failed to create tokens');
        }
        return {
            accessToken: tokens.accessToken,
            refreshToken: tokens.refreshToken,
        };
    }
    async register(registrationDto) {
        const existingUser = await this.userService.findByEmail(registrationDto.email);
        if (existingUser) {
            throw new common_1.BadRequestException('Email already exists');
        }
        const saltHash = Number(this.configService.get('PASSWORD_SALT'));
        const salt = await (0, bcryptjs_1.genSalt)(saltHash);
        const hashedPassword = await (0, bcryptjs_1.hash)(registrationDto.password, salt);
        const newUser = await this.userService.create({
            ...registrationDto,
            password: hashedPassword,
        });
        const tokens = await this.createTokenPair(newUser.id);
        if (!tokens.accessToken || !tokens.refreshToken) {
            throw new common_1.UnauthorizedException('Failed to create tokens');
        }
        return {
            accessToken: tokens.accessToken,
            refreshToken: tokens.refreshToken,
            name: newUser.name,
            email: newUser.email,
        };
    }
    async getNewTokens(refreshToken) {
        if (!refreshToken) {
            throw new common_1.UnauthorizedException('Refresh token is missing');
        }
        let payload;
        try {
            payload = await this.jwtService.verifyAsync(refreshToken, {
                secret: this.configService.get('JWT_SECRET'),
            });
        }
        catch {
            throw new common_1.UnauthorizedException('Invalid or expired refresh token');
        }
        const user = await this.userService.getByID(payload.id);
        if (!user) {
            throw new common_1.UnauthorizedException('User not found');
        }
        const tokens = await this.createTokenPair(user.id);
        if (!tokens.accessToken || !tokens.refreshToken) {
            throw new common_1.UnauthorizedException('Failed to create new tokens');
        }
        return {
            accessToken: tokens.accessToken,
            refreshToken: tokens.refreshToken,
        };
    }
    async googleLogin(userData) {
        let user = await this.userService.findByEmail(userData.email);
        let isNewUser = false;
        if (!user) {
            isNewUser = true;
            user = await this.userService.create({
                name: userData.name || 'Anonim',
                email: userData.email,
                password: userData.password,
                image: userData.picture,
                provider: 'google',
            });
        }
        const tokens = await this.createTokenPair(user.id);
        if (!tokens.accessToken || !tokens.refreshToken) {
            throw new common_1.UnauthorizedException('Failed to create tokens');
        }
        return {
            accessToken: tokens.accessToken,
            refreshToken: tokens.refreshToken,
            name: user.name,
            email: user.email,
            isNewUser,
        };
    }
    async createTokenPair(userId) {
        if (!userId) {
            throw new common_1.UnauthorizedException('User is required for token creation');
        }
        const payload = { id: userId };
        const [refreshToken, accessToken] = await Promise.all([
            this.jwtService.signAsync(payload, {
                expiresIn: this.configService.get('REFRESH_TOKEN_EXPIRATION'),
            }),
            this.jwtService.signAsync(payload, {
                expiresIn: this.configService.get('ACCESS_TOKEN_EXPIRATION'),
            }),
        ]);
        if (!refreshToken || !accessToken) {
            throw new common_1.UnauthorizedException('Failed to create tokens');
        }
        return { refreshToken, accessToken };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService,
        jwt_1.JwtService,
        user_service_1.UserService])
], AuthService);
//# sourceMappingURL=auth.service.js.map