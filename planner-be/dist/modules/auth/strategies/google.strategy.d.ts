import { UserModel } from '@/user/model/user.model';
import { ConfigService } from '@nestjs/config';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { VerifyCallback } from 'passport-google-oauth20';
declare const GoogleStrategy_base: new (...args: any) => any;
export declare class GoogleStrategy extends GoogleStrategy_base {
    private readonly configService;
    private readonly userModel;
    constructor(configService: ConfigService, userModel: ModelType<UserModel>);
    validate(accessToken: string, refreshToken: string, profile: any, done: VerifyCallback): Promise<any>;
}
export {};
