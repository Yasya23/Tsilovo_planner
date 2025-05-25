import { ForgetPasswordDto, PasswordDto, ResetPasswordDto, UpdateAvatarDto, UpdateEmailDto, UpdateNameDto } from './dto';
import { UserModel } from './model/user.model';
import { UserService } from './user.service';
import { LocaleType } from '@/shared/decorator/locale.decorator';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    getUserProfile(id: string): Promise<Partial<UserModel>>;
    forgetPassword(dto: ForgetPasswordDto, locale: LocaleType): Promise<void>;
    resetPassword(token: string, dto: ResetPasswordDto, locale: LocaleType): Promise<void>;
    delete(id: string, locale: LocaleType): Promise<void>;
    confirmDelete(token: string, locale: LocaleType): Promise<void>;
    updateName(id: string, dto: UpdateNameDto): Promise<void>;
    updateEmail(id: string, dto: UpdateEmailDto, locale: LocaleType): Promise<void>;
    updatePassword(id: string, dto: PasswordDto, locale: LocaleType): Promise<void>;
    updateAvatar(id: string, dto: UpdateAvatarDto): Promise<void>;
}
