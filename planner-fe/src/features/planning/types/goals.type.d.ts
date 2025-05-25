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

type ActiveGoal = Goal & {
  pendingTasks: number;
};

export type ActiveGoalsData = {
  activeGoals: ActiveGoal[];
  dates: string[];
  tasks: Task[];
};
