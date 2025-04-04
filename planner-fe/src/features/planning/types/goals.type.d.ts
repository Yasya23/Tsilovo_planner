import { Task, WeeklyTasks } from './task.type';
export type CreateGoal = {
  title: string;
  emoji?: string;
  isActive: boolean;
};

export type Goal = CreateGoal & {
  _id: string;
  userId: string;
};

type ActiveGoal = Goal & {
  pendingTasks: number;
};

type WeeklyStatistics = {
  completedTasks: number;
  notCompletedTasks: number;
};

export type ActiveGoalsData = {
  activeGoals: ActiveGoal[];
  weeklyTasks: WeeklyTasks;
  weeklyStatistics: WeeklyStatistics;
};
