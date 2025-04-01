import { prop, Ref } from '@typegoose/typegoose';
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import { Types } from 'mongoose';
import { GoalModel } from './goal.model';
export interface TaskModel extends Base {}

export class TaskModel extends TimeStamps {
  @prop({ required: true })
  title: string;

  @prop({ required: true, ref: 'GoalModel' })
  goalId: Ref<Types.ObjectId>;

  @prop()
  userId: Types.ObjectId;

  @prop({ required: true })
  date: Date;

  @prop({ default: false })
  isCompleted: boolean;
}
