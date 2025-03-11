import { prop, Ref } from '@typegoose/typegoose';
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import { Types } from 'mongoose';

export interface TaskModel extends Base {}

export class TaskModel extends TimeStamps {
  @prop({ required: true })
  title: string;

  @prop({ required: true, ref: 'GoalModel' })
  goal: Ref<Types.ObjectId>;

  @prop()
  userId: Types.ObjectId;

  @prop({ required: true })
  date: Date;

  @prop({ default: false })
  isCompleted: boolean;
}
