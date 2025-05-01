import { UserModel } from 'src/models/user.model';
interface AuthInfo {
    message?: string;
}
declare const JwtAuthGuard_base: import("@nestjs/passport").Type<import("@nestjs/passport").IAuthGuard>;
export declare class JwtAuthGuard extends JwtAuthGuard_base {
    handleRequest<TUser = UserModel>(err: Error | null, user: TUser | null, info: AuthInfo): TUser;
}
export {};
