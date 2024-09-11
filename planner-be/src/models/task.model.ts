import { prop } from '@typegoose/typegoose';
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';

export interface TaskModel extends Base {}

export class TaskModel extends TimeStamps {
  @prop()
  taskId: number;

  @prop()
  createdAt?: Date;

  @prop()
  updatedAt?: Date;

  @prop()
  section?: string;

  @prop()
  hasTimer?: boolean;

  @prop()
  pomidoroCount?: number;

  @prop()
  pomidoroDone?: number;
}
