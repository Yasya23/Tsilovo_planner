export type GoalStats = {
  goalId: string;
  emoji: string;
  completedTasks: number;
  taskIds: string[];
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
