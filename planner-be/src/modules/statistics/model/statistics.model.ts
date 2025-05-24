import { TaskType } from '@/statistics/types/task.type';
import { prop } from '@typegoose/typegoose';
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';

export interface StatisticsModel extends Base {}

export class GoalStats {
  @prop({ required: true })
  goalId: string;

  @prop({ default: '' })
  title: string;

  @prop({ default: '' })
  emoji: string;

  @prop({ default: 0 })
  completedTasks: number;

  @prop({ default: [] })
  tasks: TaskType[];
}

export class MonthlyStats {
  @prop({ required: true })
  month: number;

  @prop({ required: true })
  totalGoals: number;

  @prop({ required: true })
  totalCompleted: number;

  @prop({ type: () => [GoalStats], default: [] })
  goals: GoalStats[];
}

export class StatisticsModel extends TimeStamps {
  @prop({ required: true })
  userId: string;

  @prop({ required: true })
  year: number;

  @prop({ required: true })
  totalCompleted: number;

  @prop({ required: true })
  totalGoals: number;

  @prop({ type: () => [Number], default: [] })
  availableYears: number[];

  @prop({ type: () => [MonthlyStats], default: [] })
  monthlyStats: MonthlyStats[];
}
