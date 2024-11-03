type TaskDto = {
  title: string;
  isCompleted: boolean;
};

type DailyTaskDto = {
  day: string;
  tasks: TaskDto[];
};

export type WeekTasks = {
  id: string;
  week: number;
  notes: [string, string, string];
  dailyTasks: DailyTaskDto[];
  statistics: {
    completedTasks: number;
    totalTasks: number;
  };
};

export type TotalTasks = {
  userId: string;
  completedTasks: number;
  totalTasks: number;
  tasksList: WeekTasksDto[];
};
