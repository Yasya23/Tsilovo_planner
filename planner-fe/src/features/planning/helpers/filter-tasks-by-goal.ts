import { ActiveGoal } from '@/features/planning/types/goals.type';
import { Task } from '@/features/planning/types/task.type';

export const filterTasksByGoals = (tasks: Task[], goals: ActiveGoal[]) => {
  const goalsWithTasks = goals.filter((goal) =>
    tasks.some((task) => task.goalId === goal._id)
  );

  const goalsWithoutTasks = goals.filter(
    (goal) => !tasks.some((task) => task.goalId === goal._id)
  );

  const goalsWithNonCompletedTasks: ActiveGoal[] = [];
  const goalsWithAllCompletedTasks: ActiveGoal[] = [];

  goalsWithTasks.forEach((goal) => {
    const goalTasks = tasks.filter((task) => task.goalId === goal._id);

    const hasNonCompletedTask = goalTasks.some((task) => !task.isCompleted);

    if (hasNonCompletedTask) {
      goalsWithNonCompletedTasks.push(goal);
    } else {
      goalsWithAllCompletedTasks.push(goal);
    }
  });

  const completedTasksNumber = tasks.filter((task) => task.isCompleted).length;
  const notCompletedTasksNumber = tasks.filter(
    (task) => !task.isCompleted
  ).length;

  const goalsWithOrderedTasks = [
    ...goalsWithNonCompletedTasks,
    ...goalsWithAllCompletedTasks,
  ];

  const orderedGoals = [...goalsWithOrderedTasks, ...goalsWithoutTasks];

  return {
    orderedGoals,
    completedTasksNumber,
    notCompletedTasksNumber,
    goalsWithOrderedTasks,
    goalsWithoutTasks,
  };
};
