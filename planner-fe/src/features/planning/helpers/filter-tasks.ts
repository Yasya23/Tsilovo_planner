import { ActiveGoal } from '@/features/planning/types/goals.type';
import { Task } from '@/features/planning/types/task.type';
export const filterTasks = (tasks: Task[], activeGoals: ActiveGoal[]) => {
  const goalsWithTasks = activeGoals.filter((goal) =>
    tasks.some((task) => task.goalId === goal._id)
  );
  const goalsWithoutTasks = activeGoals.filter(
    (goal) => !tasks.some((task) => task.goalId === goal._id)
  );

  return { goalsWithTasks, goalsWithoutTasks };
};
