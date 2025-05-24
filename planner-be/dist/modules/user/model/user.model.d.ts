import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
export interface UserModel extends Base {
}
export declare class UserModel extends TimeStamps {
    email: string;
    password: string;
    name: string;
    image: string;
    provider: string;
    isActive?: boolean;
    deletedAt?: Date;
    oldEmail?: string;
}
export type UserModelType = keyof UserModel;
