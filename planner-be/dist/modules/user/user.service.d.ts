import { ForgetPasswordDto, PasswordDto, UpdateAvatarDto, UpdateEmailDto, UpdateNameDto } from './dto';
import { ResendService } from '@/modules/resend/resend.service';
import { LocaleType } from '@/shared/decorator/locale.decorator';
import { UserModel } from '@/user/model/user.model';
import { ConfigService } from '@nestjs/config';
import { ModelType } from '@typegoose/typegoose/lib/types';
export declare class UserService {
    private readonly userModel;
    private readonly configService;
    private readonly resendService;
    constructor(userModel: ModelType<UserModel>, configService: ConfigService, resendService: ResendService);
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
    updatePassword(userId: string, userDto: PasswordDto, locale: any): Promise<void>;
    updateEmail(userId: string, userDto: UpdateEmailDto, locale: string): Promise<void>;
    updateAvatar(userId: string, { image }: UpdateAvatarDto): Promise<import("mongoose").Document<unknown, import("@typegoose/typegoose/lib/types").BeAnObject, UserModel, import("@typegoose/typegoose/lib/types").BeAnyObject> & Omit<UserModel & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, "typegooseName"> & import("@typegoose/typegoose/lib/types").IObjectWithTypegooseFunction>;
    deleteProfile(id: string): Promise<void>;
    forgotPassword({ email }: ForgetPasswordDto, locale: LocaleType): Promise<void>;
    resetPasswordWithToken(token: string, newPassword: string, locale: LocaleType): Promise<void>;
    deleteAccountWithToken(token: string, locale: LocaleType): Promise<void>;
    generateActionToken(userId: string, action: 'reset' | 'delete' | 'email'): string;
}
