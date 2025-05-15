import { ActiveGoalsData } from '@/features/planning/types/goals.type';
import { Task } from '@/features/planning/types/task.type';

export const createWeeklyStatistics = (data?: ActiveGoalsData) => {
  const completedTasks =
    data?.tasks.filter((task: Task) => task.isCompleted) ?? [];
  const notCompletedTasks =
    data?.tasks.filter((task: Task) => !task.isCompleted) ?? [];

  const weeklyStatistics = {
    completedTasks: completedTasks.length ?? 0,
    notCompletedTasks: notCompletedTasks.length ?? 0,
  };

  return weeklyStatistics;
};
