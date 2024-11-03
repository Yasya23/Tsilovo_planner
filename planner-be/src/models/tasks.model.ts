import { prop, Ref } from '@typegoose/typegoose';
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import { Types } from 'mongoose';

export interface TaskModel extends Base {}

export class TaskModel extends TimeStamps {
  @prop({ required: true })
  title: string;

  @prop({ default: false })
  isCompleted: boolean;
}

class DailyTask {
  @prop({ required: true })
  day: string;

  @prop({ type: () => [TaskModel], default: [] })
  tasks: TaskModel[];
}

class Statistics {
  @prop({ required: true, default: 0 })
  completedTasks: number;

  @prop({ required: true, default: 0 })
  totalTasks: number;
}

export class WeekTasksModel extends TimeStamps {
  @prop({ type: () => Types.ObjectId, ref: 'UserModel', required: true })
  userId: Ref<Types.ObjectId>;

  @prop({ required: true })
  week: number;

  @prop({ type: () => [String], default: [] })
  notes: string[];

  @prop({ type: () => [DailyTask], default: [] })
  dailyTasks: DailyTask[];

  @prop({ type: () => Statistics, _id: false, required: true })
  statistics: Statistics;
}
