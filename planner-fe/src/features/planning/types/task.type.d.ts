export type CreateTask = {
  title: string;
  goalId: string;
  date: Date;
  isCompleted: boolean;
};

export type Task = CreateTask & {
  _id: string;
  userId: string;
};
