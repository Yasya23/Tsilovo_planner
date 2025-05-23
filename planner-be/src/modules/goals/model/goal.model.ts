import { prop, Ref } from '@typegoose/typegoose';
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import { Types } from 'mongoose';
import { TaskModel } from '../../tasks/model/tasks.model';

export interface GoalModel extends Base {}

export class GoalModel extends TimeStamps {
  @prop({ required: true })
  title: string;

  @prop()
  userId: Types.ObjectId;

  @prop({ ref: () => TaskModel })
  tasks: Ref<TaskModel>[];

  @prop()
  emoji: string;

  @prop({ default: true })
  isActive: boolean;
}
