import { UserService } from './user.service';
import { UpdateNameDto, UpdateEmailDto, UpdatePasswordDto, UpdateAvatarDto } from './dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    getUserProfile(id: string): Promise<import("mongoose").Document<unknown, import("@typegoose/typegoose/lib/types").BeAnObject, import("./model/user.model").UserModel, import("@typegoose/typegoose/lib/types").BeAnyObject> & Omit<import("./model/user.model").UserModel & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, "typegooseName"> & import("@typegoose/typegoose/lib/types").IObjectWithTypegooseFunction>;
    updateName(id: string, dto: UpdateNameDto): Promise<void>;
    updateEmail(id: string, dto: UpdateEmailDto): Promise<void>;
    updatePassword(id: string, dto: UpdatePasswordDto): Promise<void>;
    updateAvatar(id: string, dto: UpdateAvatarDto): Promise<import("mongoose").Document<unknown, import("@typegoose/typegoose/lib/types").BeAnObject, import("./model/user.model").UserModel, import("@typegoose/typegoose/lib/types").BeAnyObject> & Omit<import("./model/user.model").UserModel & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, "typegooseName"> & import("@typegoose/typegoose/lib/types").IObjectWithTypegooseFunction>;
    delete(id: string): Promise<void>;
}
