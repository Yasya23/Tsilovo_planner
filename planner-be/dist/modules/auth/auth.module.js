"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const auth_controller_1 = require("./auth.controller");
const auth_service_1 = require("./auth.service");
const jwt_config_1 = require("../../config/jwt.config");
const strategies_1 = require("./strategies");
const mail_module_1 = require("../mail/mail.module");
const user_model_1 = require("../user/model/user.model");
const user_module_1 = require("../user/user.module");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const passport_1 = require("@nestjs/passport");
const nestjs_typegoose_1 = require("nestjs-typegoose");
let AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [
            nestjs_typegoose_1.TypegooseModule.forFeature([
                {
                    typegooseClass: user_model_1.UserModel,
                    schemaOptions: {
                        collection: 'User',
                    },
                },
            ]),
            config_1.ConfigModule,
            passport_1.PassportModule,
            user_module_1.UserModule,
            mail_module_1.MailModule,
            jwt_1.JwtModule.registerAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: jwt_config_1.getJWTDbConfig,
            }),
        ],
        providers: [auth_service_1.AuthService, strategies_1.JwtStrategy, strategies_1.GoogleStrategy],
        controllers: [auth_controller_1.AuthController],
    })
], AuthModule);
//# sourceMappingURL=auth.module.js.map