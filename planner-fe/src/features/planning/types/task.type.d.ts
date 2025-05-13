export type CreateTask = {
  title: string;
  goalId: string;
  date: string;
  isCompleted: boolean;
};

export type Task = CreateTask & {
  _id: string;
  userId: string;
  date: string;
};

export type WeeklyTasks = { date: string; tasks: Task[] }[];

export type WeeklyTasksNoMapped = { allDates: []; tasks: Task[] }[];
