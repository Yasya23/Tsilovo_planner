import { Task } from './task.type';
export type CreateGoal = {
  title: string;
  emoji?: string;
  isActive: boolean;
};

export type Goal = CreateGoal & {
  _id: string;
  userId: string;
};

type ActiveGoal = CreateGoal & {
  pendingTasks: number;
};

export type ActiveGoals = {
  activeGoals: ActiveGoal[];
  weeklyTasks: { date: string; tasks: Task[] }[];
};
