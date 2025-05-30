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
exports.JwtStrategy = void 0;
const user_model_1 = require("../../user/model/user.model");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const passport_1 = require("@nestjs/passport");
const nestjs_typegoose_1 = require("nestjs-typegoose");
const passport_jwt_1 = require("passport-jwt");
let JwtStrategy = class JwtStrategy extends (0, passport_1.PassportStrategy)(passport_jwt_1.Strategy) {
    constructor(configService, userModel) {
        super({
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromExtractors([
                (request) => {
                    const token = request?.cookies?.['accessToken'];
                    if (!token) {
                        throw new common_1.UnauthorizedException('No access token provided');
                    }
                    return token;
                },
            ]),
            ignoreExpiration: false,
            secretOrKey: configService.get('JWT_SECRET'),
        });
        this.configService = configService;
        this.userModel = userModel;
    }
    async validate(payload) {
        if (!payload?.id) {
            throw new common_1.UnauthorizedException('Invalid token payload');
        }
        const user = await this.userModel.findById(payload.id).exec();
        if (!user) {
            throw new common_1.UnauthorizedException('User not found or token invalid');
        }
        if (user.dataChangedAt) {
            const issuedAt = (payload.iat ?? 0) * 1000;
            const changedAt = new Date(user.dataChangedAt).getTime();
            const isTokenInvalid = issuedAt < changedAt;
            if (isTokenInvalid) {
                throw new common_1.UnauthorizedException('Token is no longer valid');
            }
        }
        return user;
    }
};
exports.JwtStrategy = JwtStrategy;
exports.JwtStrategy = JwtStrategy = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, nestjs_typegoose_1.InjectModel)(user_model_1.UserModel)),
    __metadata("design:paramtypes", [config_1.ConfigService, Object])
], JwtStrategy);
//# sourceMappingURL=jwt.strategy.js.map