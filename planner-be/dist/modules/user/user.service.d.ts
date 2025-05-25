import { ForgetPasswordDto, PasswordDto, ResetPasswordDto, UpdateAvatarDto, UpdateEmailDto, UpdateNameDto } from './dto';
import { MailService } from '@/modules/mail/mail.service';
import { LocaleType } from '@/shared/decorator/locale.decorator';
import { UserModel } from '@/user/model/user.model';
import { ConfigService } from '@nestjs/config';
import { ModelType } from '@typegoose/typegoose/lib/types';
export declare class UserService {
    private readonly userModel;
    private readonly configService;
    private readonly mailService;
    private readonly logger;
    constructor(userModel: ModelType<UserModel>, configService: ConfigService, mailService: MailService);
    getAllUsers(): Promise<UserModel[]>;
    getByID(id: string): Promise<UserModel>;
    getProfile(id: string): Promise<Partial<UserModel>>;
    findByEmail(email: string): Promise<UserModel>;
    create(userData: Partial<UserModel>): Promise<UserModel>;
    updateName(userId: string, userDto: UpdateNameDto): Promise<void>;
    updatePassword(userId: string, userDto: PasswordDto, locale: LocaleType): Promise<void>;
    updateEmail(userId: string, userDto: UpdateEmailDto, locale: LocaleType): Promise<void>;
    updateAvatar(userId: string, { image }: UpdateAvatarDto): Promise<void>;
    deleteProfile(id: string, locale: LocaleType): Promise<void>;
    forgotPassword({ email }: ForgetPasswordDto, locale: LocaleType): Promise<void>;
    resetPasswordWithToken(token: string, { password }: ResetPasswordDto, locale: LocaleType): Promise<void>;
    deleteAccountWithToken(token: string, locale: LocaleType): Promise<void>;
    generateActionToken(userId: string, action: 'reset' | 'delete' | 'email'): string;
    handleDeleteCron(): Promise<void>;
}
