import next from 'next';

import { ActiveGoalsData } from '@/features/planning/types/goals.type';
import { Task } from '@/features/planning/types/task.type';

export const mapWeeklyTasks = (data?: ActiveGoalsData) => {
  const tasksByDate = (tasks: Task[]) => {
    return tasks.reduce(
      (acc, task) => {
        const dateStr = new Date(task.date).toISOString().split('T')[0];
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

  const mappedWeeklyTasks =
    data?.dates?.map((date: string) => {
      const formattedDate = new Date(date).toISOString().split('T')[0];

      return {
        date: formattedDate,
        tasks: tasksByDate(data?.tasks)[formattedDate] || [],
      };
    }) || [];

  const currentWeek =
    mappedWeeklyTasks?.length > 7
      ? mappedWeeklyTasks.slice(0, 7)
      : mappedWeeklyTasks;

  const nextWeek =
    mappedWeeklyTasks?.length > 7 ? mappedWeeklyTasks.slice(7) : null;

  const weeks = nextWeek ? [currentWeek, nextWeek] : [currentWeek];
  return weeks;
};
