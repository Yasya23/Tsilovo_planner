import { Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { UserModel } from 'src/models/user.model';
import { ModelType } from '@typegoose/typegoose/lib/types';
interface JwtPayload {
    id: string;
}
declare const JwtStrategy_base: new (...args: [opt: import("passport-jwt").StrategyOptionsWithRequest] | [opt: import("passport-jwt").StrategyOptionsWithoutRequest]) => Strategy & {
    validate(...args: any[]): unknown;
};
export declare class JwtStrategy extends JwtStrategy_base {
    private readonly configService;
    private readonly userModel;
    constructor(configService: ConfigService, userModel: ModelType<UserModel>);
    validate(payload: JwtPayload): Promise<UserModel>;
}
export {};
