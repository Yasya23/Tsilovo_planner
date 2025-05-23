import { ModelType } from '@typegoose/typegoose/lib/types';
import { UserModel } from 'src/modules/user/model/user.model';
import { UpdateAvatarDto, UpdatePasswordDto, UpdateNameDto, UpdateEmailDto } from './dto';
import { ConfigService } from '@nestjs/config';
export declare class UserService {
    private readonly userModel;
    private readonly configService;
    constructor(userModel: ModelType<UserModel>, configService: ConfigService);
    getAllUsers(): Promise<any[]>;
    getByID(id: string): Promise<import("mongoose").Document<unknown, import("@typegoose/typegoose/lib/types").BeAnObject, UserModel, import("@typegoose/typegoose/lib/types").BeAnyObject> & Omit<UserModel & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, "typegooseName"> & import("@typegoose/typegoose/lib/types").IObjectWithTypegooseFunction>;
    updateName(userId: string, userDto: UpdateNameDto): Promise<void>;
    updatePassword(userId: string, userDto: UpdatePasswordDto): Promise<void>;
    updateEmail(userId: string, userDto: UpdateEmailDto): Promise<void>;
    updateAvatar(userId: string, { image }: UpdateAvatarDto): Promise<import("mongoose").Document<unknown, import("@typegoose/typegoose/lib/types").BeAnObject, UserModel, import("@typegoose/typegoose/lib/types").BeAnyObject> & Omit<UserModel & Required<{
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
    deleteProfile(id: string): Promise<void>;
}
