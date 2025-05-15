export type Task = {
  _id: string;
  userId: string;
  date: string;
  title: string;
  goalId: string;
  date: string;
  isCompleted: boolean;
};

export type GoalStats = {
  goalId: string;
  emoji: string;
  completedTasks: number;
  taskIds: string[];
  tasks: Task[];
  title: string;
  _id: string;
};

export type MonthlyStats = {
  month: number;
  totalGoals: number;
  totalCompleted: number;
  goals: GoalStats[];
  _id: string;
};

export type UserStatistics = {
  userId: string;
  year: number;
  totalCompleted: number;
  totalGoals: number;
  availableYears: number[];
  monthlyStats: MonthlyStats[];
};
