import { ActiveGoalsData } from '@/features/planning/types/goals.type';
import { Task } from '@/features/planning/types/task.type';

export const createWeeklyStatistics = (data?: ActiveGoalsData) => {
  if (!data?.tasks) return [];

  const completedTasks =
    data?.tasks.filter((task: Task) => task.isCompleted) ?? [];
  const notCompletedTasks =
    data?.tasks.filter((task: Task) => !task.isCompleted) ?? [];

  const weeklyStatistics = {
    completedTasks: completedTasks.length,
    notCompletedTasks: notCompletedTasks.length,
  };

  return weeklyStatistics;
};
