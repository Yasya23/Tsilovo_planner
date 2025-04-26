import { ActiveGoal } from '@/features/planning/types/goals.type';
import { Task } from '@/features/planning/types/task.type';

export const filterTasksByGoals = (tasks: Task[], goals: ActiveGoal[]) => {
  const goalsWithTasks = goals.filter((goal) =>
    tasks.some((task) => task.goalId === goal._id)
  );

  const goalsWithoutTasks = goals.filter(
    (goal) => !tasks.some((task) => task.goalId === goal._id)
  );

  const completedTasksNumber = tasks.filter((task) => task.isCompleted).length;
  const notCompletedTasksNumber = tasks.filter(
    (task) => !task.isCompleted
  ).length;

  const orderedGoals = [...goalsWithTasks, ...goalsWithoutTasks];

  return {
    orderedGoals,
    completedTasksNumber,
    notCompletedTasksNumber,
  };
};
