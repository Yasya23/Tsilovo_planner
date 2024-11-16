export type Task = {
  id?: string;
  title: string;
  isCompleted: boolean;
};

export type Note = string;

type DailyTask = {
  day: string;
  tasks: Task[];
};

export type WeekTasks = {
  id?: string;
  week: number;
  notes: Note[];
  dailyTasks: DailyTask[];
  statistics: {
    completedTasks: number;
    totalTasks: number;
  };
};

export type TotalTasks = {
  userId: string;
  completedTasks: number;
  totalTasks: number;
  tasksList: WeekTasks[];
};
