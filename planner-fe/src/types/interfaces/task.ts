export interface Task {
  _id: string;
  userId: string;
  title: string;
  dueDate: string;
  section?: string;
  isCompleted: boolean;
  priority?: string;
}
