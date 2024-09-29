import { prop } from '@typegoose/typegoose';
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import { Priority } from 'src/typing/types';

export interface TaskModel extends Base {}

export class TaskModel extends TimeStamps {
  @prop({ required: true })
  dueDate: string;

  @prop()
  section?: string;

  @prop()
  userId: string;

  @prop()
  title?: string;

  @prop({ default: false })
  isCompleted: boolean;

  @prop({ default: null })
  priority: Priority;
}
