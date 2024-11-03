export class TaskDto {
  title: string;
  isCompleted: boolean;
}

export class WeekTasksDto {
  week: number;
  notes: [string, string, string];
  tasks: TaskDto[];
  statistics: {
    completedTasks: number;
    totalTasks: number;
  };
}

export class YearStatisticDto {
  totalTasks: number;
  completedTasks: number;
  weeklyStatistics: WeekTasksDto[];
}
