import { prop } from '@typegoose/typegoose';
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';

export interface UserModel extends Base {}

export class UserModel extends TimeStamps {
  @prop({ unique: true })
  email: string;

  @prop()
  password: string;

  @prop()
  name: string;

  @prop()
  image: string;

  @prop({ default: 'local' })
  provider: string;

  @prop({ default: true })
  isActive?: boolean;

  @prop()
  deletedAt?: Date;

  @prop()
  oldEmail?: string;

  @prop()
  dataChangedAt?: Date;
}

export type UserModelType = keyof UserModel;
