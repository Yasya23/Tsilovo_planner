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
    getAllUsers(): Promise<any[]>;
    getByID(id: string): Promise<import("mongoose").Document<unknown, import("@typegoose/typegoose/lib/types").BeAnObject, UserModel, import("@typegoose/typegoose/lib/types").BeAnyObject> & Omit<UserModel & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, "typegooseName"> & import("@typegoose/typegoose/lib/types").IObjectWithTypegooseFunction>;
    findByEmail(email: string): Promise<import("mongoose").Document<unknown, import("@typegoose/typegoose/lib/types").BeAnObject, UserModel, import("@typegoose/typegoose/lib/types").BeAnyObject> & Omit<UserModel & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, "typegooseName"> & import("@typegoose/typegoose/lib/types").IObjectWithTypegooseFunction>;
    create(userData: Partial<UserModel>): Promise<import("mongoose").Document<unknown, import("@typegoose/typegoose/lib/types").BeAnObject, UserModel, import("@typegoose/typegoose/lib/types").BeAnyObject> & Omit<UserModel & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, "typegooseName"> & import("@typegoose/typegoose/lib/types").IObjectWithTypegooseFunction>;
    updateName(userId: string, userDto: UpdateNameDto): Promise<void>;
    updatePassword(userId: string, userDto: PasswordDto, locale: LocaleType): Promise<void>;
    updateEmail(userId: string, userDto: UpdateEmailDto, locale: LocaleType): Promise<void>;
    updateAvatar(userId: string, { image }: UpdateAvatarDto): Promise<import("mongoose").Document<unknown, import("@typegoose/typegoose/lib/types").BeAnObject, UserModel, import("@typegoose/typegoose/lib/types").BeAnyObject> & Omit<UserModel & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, "typegooseName"> & import("@typegoose/typegoose/lib/types").IObjectWithTypegooseFunction>;
    deleteProfile(id: string, locale: LocaleType): Promise<void>;
    forgotPassword({ email }: ForgetPasswordDto, locale: LocaleType): Promise<void>;
    resetPasswordWithToken(token: string, { password }: ResetPasswordDto, locale: LocaleType): Promise<void>;
    deleteAccountWithToken(token: string, locale: LocaleType): Promise<void>;
    generateActionToken(userId: string, action: 'reset' | 'delete' | 'email'): string;
    handleDeleteCron(): Promise<void>;
}
