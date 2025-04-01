import { WeeklyTasks } from '@/features/planning/types/task.type';

export const filterDays = (week: WeeklyTasks) => {
  const daysWithTasks = week.filter((day) => day.tasks.length > 0);
  const daysWithoutTasks = week.filter((day) => day.tasks.length === 0);

  return [...daysWithTasks, ...daysWithoutTasks];
};
