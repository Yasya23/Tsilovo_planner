import { UserService } from './user.service';
import { UpdateUserDto } from 'src/typing/dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    getUserProfile(id: string): Promise<import("mongoose").Document<unknown, import("@typegoose/typegoose/lib/types").BeAnObject, import("../../models/user.model").UserModel> & Omit<import("../../models/user.model").UserModel & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, "typegooseName"> & import("@typegoose/typegoose/lib/types").IObjectWithTypegooseFunction>;
    getUser(id: string): Promise<import("mongoose").Document<unknown, import("@typegoose/typegoose/lib/types").BeAnObject, import("../../models/user.model").UserModel> & Omit<import("../../models/user.model").UserModel & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, "typegooseName"> & import("@typegoose/typegoose/lib/types").IObjectWithTypegooseFunction>;
    update(id: string, dto: UpdateUserDto): Promise<{
        id: any;
        name: string;
        email: string;
    }>;
    delete(id: string): Promise<{
        message: string;
    }>;
}
