import { prop } from '@typegoose/typegoose';
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import { Types } from 'mongoose';
export interface UserModel extends Base {}

export class GoalModel extends TimeStamps {
  @prop({ required: true })
  title: string;

  @prop()
  userId: Types.ObjectId;

  @prop()
  emoji: string;

  @prop({ default: true })
  isActive: boolean;
}
