import { ActiveGoalsData } from '@/features/planning/types/goals.type';
import { Task } from '@/features/planning/types/task.type';

const getUTCDateOnly = (isoDate: string): string => {
  const date = new Date(isoDate);
  return new Date(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
  ).toISOString();
};

export const mapWeeklyTasks = (data?: ActiveGoalsData) => {
  const tasksByDate = (tasks: Task[]) => {
    return tasks.reduce(
      (acc, task) => {
        const dateStr = getUTCDateOnly(task.date);
        if (acc[dateStr]) {
          acc[dateStr].push(task);
        } else {
          acc[dateStr] = [task];
        }
        return acc;
      },
      {} as Record<string, Task[]>
    );
  };

  const normalizedDates = data?.dates?.map(getUTCDateOnly) || [];

  const groupedTasks = tasksByDate(data?.tasks || []);

  const mappedWeeklyTasks = normalizedDates.map((date: string) => ({
    date,
    tasks: groupedTasks[date] || [],
  }));

  const currentWeek =
    mappedWeeklyTasks.length > 7
      ? mappedWeeklyTasks.slice(0, 7)
      : mappedWeeklyTasks;

  const nextWeek =
    mappedWeeklyTasks.length > 7 ? mappedWeeklyTasks.slice(7) : null;

  return nextWeek ? [currentWeek, nextWeek] : [currentWeek];
};
