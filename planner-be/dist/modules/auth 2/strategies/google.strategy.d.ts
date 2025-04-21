import { VerifyCallback } from 'passport-google-oauth20';
import { ConfigService } from '@nestjs/config';
import { UserModel } from 'src/models/user.model';
import { ModelType } from '@typegoose/typegoose/lib/types';
declare const GoogleStrategy_base: new (...args: any) => any;
export declare class GoogleStrategy extends GoogleStrategy_base {
    private readonly configService;
    private readonly userModel;
    constructor(configService: ConfigService, userModel: ModelType<UserModel>);
    validate(accessToken: string, refreshToken: string, profile: any, done: VerifyCallback): Promise<any>;
}
export {};
