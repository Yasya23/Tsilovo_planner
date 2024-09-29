import { prop } from '@typegoose/typegoose';
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import { Priority } from 'src/typing/types';
import { UserModel } from './user.model';
import { Ref } from '@typegoose/typegoose';
export interface TaskModel extends Base {}

export class TaskModel extends TimeStamps {
  @prop({ required: true, default: Date.now })
  dueDate: Date;

  @prop()
  section?: string;

  @prop()
  title?: string;

  @prop({ default: false })
  isCompleted: boolean;

  @prop({ default: null })
  priority: Priority;
}
