export interface Task {
  id: string;
  userId: string;
  title: string;
  dueDate: Date;
  section?: string;
  isCompleted: boolean;
  priority?: string;
}
