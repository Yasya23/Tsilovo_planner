import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { TaskServices } from '../services/tasks.service';
import { GoalServices } from '../services/goals.service';
import { Task } from '../types/task.type';
import { ActiveGoals } from '../types/goals.type';

export const usePlanning = () => {
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery<ActiveGoals, Error>({
    queryKey: ['planning'],
    queryFn: async () => {
      const goals = await GoalServices.getActive();

      const activeGoals = goals?.activeGoals ?? [];
      const weeklyTasks = goals?.weeklyTasks ?? [];

      return { activeGoals, weeklyTasks };
    },
  });

  const createTask = useMutation({
    mutationFn: TaskServices.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['planning'] });
    },
  }).mutate;

  const updateTask = useMutation({
    mutationFn: TaskServices.update,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['planning'] });
    },
  }).mutate;

  const deleteTask = useMutation({
    mutationFn: TaskServices.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['planning'] });
    },
  }).mutate;

  const createGoal = useMutation({
    mutationFn: GoalServices.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['planning'] });
    },
  }).mutate;

  const updateGoal = useMutation({
    mutationFn: GoalServices.update,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['planning'] });
    },
  }).mutate;

  const deleteGoal = useMutation({
    mutationFn: GoalServices.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['planning'] });
    },
  }).mutate;

  const activeGoals = data?.activeGoals ?? [];
  const tasks = data?.weeklyTasks ?? [];
  const currentWeek = tasks.length > 7 ? tasks.slice(0, 7) : tasks;
  const nextWeek = tasks.length > 7 ? tasks.slice(7) : null;

  return {
    activeGoals,
    currentWeek,
    nextWeek,
    isLoading,
    isError,
    createGoal,
    updateGoal,
    deleteGoal,
    createTask,
    updateTask,
    deleteTask,
  };
};
