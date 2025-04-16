import { ActiveGoal } from '@/features/planning/types/goals.type';
import { Task } from '@/features/planning/types/task.type';

export const filterTasks = (tasks: Task[], goals: ActiveGoal[]) => {
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

  const allTasks = tasks.filter((task) => !task.goalId);
  const completedTasksNumber = tasks.filter((task) => task.isCompleted).length;
  const notCompletedTasksNumber = tasks.filter(
    (task) => !task.isCompleted
  ).length;

  const orderedGoals = [
    ...goalsWithNonCompletedTasks,
    ...goalsWithAllCompletedTasks,
    ...goalsWithoutTasks,
  ];

  return {
    orderedGoals,
    allTasks,
    completedTasksNumber,
    notCompletedTasksNumber,
  };
};
