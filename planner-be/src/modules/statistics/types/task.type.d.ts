export type TaskType = {
  _id: Types.ObjectId;
  goalId: Types.ObjectId;
  userId: Types.ObjectId;
  title: string;
  date: Date;
};

export type GoalsStats = {
  goalId: Types.ObjectId;
  completedTasks: number;
  tasks: TaskType[];
  title: string;
  emoji: string;
};

export type MonthStats = {
  month: number;
  totalGoals: number;
  totalCompleted: number;
  goals: goalStats[];
};

export type FilteredTasksByMonth = {
  [month: number]: TaskType[];
};

export type FilteredTasksByYears = {
  [year: number]: FilteredTasksByMonth;
};
