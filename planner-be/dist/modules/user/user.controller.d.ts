import { ForgetPasswordDto, PasswordDto, UpdateAvatarDto, UpdateEmailDto, UpdateNameDto } from './dto';
import { UserService } from './user.service';
import { LocaleType } from '@/shared/decorator/locale.decorator';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    getUserProfile(id: string): Promise<import("mongoose").Document<unknown, import("@typegoose/typegoose/lib/types").BeAnObject, import("./model/user.model").UserModel, import("@typegoose/typegoose/lib/types").BeAnyObject> & Omit<import("./model/user.model").UserModel & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, "typegooseName"> & import("@typegoose/typegoose/lib/types").IObjectWithTypegooseFunction>;
    forgetPassword(dto: ForgetPasswordDto, locale: LocaleType): Promise<void>;
    resetPassword(token: string, dto: PasswordDto, locale: LocaleType): Promise<void>;
    updateName(id: string, dto: UpdateNameDto): Promise<void>;
    updateEmail(id: string, dto: UpdateEmailDto, locale: LocaleType): Promise<void>;
    updatePassword(id: string, dto: PasswordDto, locale: LocaleType): Promise<void>;
    updateAvatar(id: string, dto: UpdateAvatarDto): Promise<import("mongoose").Document<unknown, import("@typegoose/typegoose/lib/types").BeAnObject, import("./model/user.model").UserModel, import("@typegoose/typegoose/lib/types").BeAnyObject> & Omit<import("./model/user.model").UserModel & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, "typegooseName"> & import("@typegoose/typegoose/lib/types").IObjectWithTypegooseFunction>;
    delete(id: string): Promise<void>;
    confirmDelete(token: string, locale: LocaleType): Promise<void>;
}
