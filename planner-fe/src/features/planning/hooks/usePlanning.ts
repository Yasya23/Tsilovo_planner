import toast from 'react-hot-toast';

import { useTranslations } from 'next-intl';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { mapWeeklyTasks } from '@/features/planning/helpers/map-weekly-tasks';
import { createWeeklyStatistics } from '@/features/planning/helpers/weekly-statistic';
import { GoalServices } from '@/features/planning/services/goals.service';
import { TaskServices } from '@/features/planning/services/tasks.service';
import { ActiveGoalsData } from '@/features/planning/types/goals.type';
import { CreateTask, Task } from '@/features/planning/types/task.type';

export const usePlanning = () => {
  const t = useTranslations('Common.planning');
  const queryClient = useQueryClient();

  const { data, isPending, isError } = useQuery<ActiveGoalsData, Error>({
    queryKey: ['planning'],

    queryFn: async () => {
      const data = await GoalServices.getActive();
      return data;
    },
  });

  const createTask = useMutation({
    mutationFn: TaskServices.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['planning'] });
    },
    onError: () => toast.error(t('createTask.error')),
  });

  const updateTask = useMutation({
    mutationFn: TaskServices.update,
    onMutate: async (newTask: Task) => {
      await queryClient.cancelQueries({ queryKey: ['planning'] });

      const previousData = queryClient.getQueryData(['planning']);

      queryClient.setQueryData(['planning'], (oldData: ActiveGoalsData) => {
        const updatedWeeklyTasks = oldData.tasks.map((task: Task) =>
          task._id === newTask._id ? { ...task, ...newTask } : task
        );

        return {
          ...oldData,
          tasks: updatedWeeklyTasks,
        };
      });

      return { previousData };
    },

    onError: (_err, _vars, context) => {
      queryClient.setQueryData(['planning'], context?.previousData);
      toast.error(t('updateTask.error'));
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['planning'] });
    },
  });

  const deleteTask = useMutation({
    mutationFn: TaskServices.delete,

    onMutate: async (deletedTaskId: string) => {
      await queryClient.cancelQueries({ queryKey: ['planning'] });

      const previousData = queryClient.getQueryData(['planning']);

      queryClient.setQueryData(['planning'], (oldData: ActiveGoalsData) => {
        const updatedWeeklyTasks = oldData.tasks.filter(
          (task: Task) => task._id !== deletedTaskId
        );
        return {
          ...oldData,
          tasks: updatedWeeklyTasks,
        };
      });
      return { previousData };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['planning'] });
    },

    onError: (_err, _vars, context) => {
      queryClient.setQueryData(['planning'], context?.previousData);
      toast.error(t('deleteTask.error'));
    },
  }).mutate;

  const createGoal = useMutation({
    mutationFn: GoalServices.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['planning'] });
    },
    onError: () => toast.error(t('createGoal.error')),
  }).mutate;

  const updateGoal = useMutation({
    mutationFn: GoalServices.update,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['planning'] });
    },
    onError: () => toast.error(t('updateGoal.error')),
  }).mutate;

  const deleteGoal = useMutation({
    mutationFn: GoalServices.delete,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['planning'] });
    },
    onError: () => toast.error(t('deleteGoal.error')),
  }).mutate;

  const activeGoals = data?.activeGoals ?? [];
  const weeks = mapWeeklyTasks(data);
  const weeklyStatistics = createWeeklyStatistics(data);

  return {
    activeGoals,
    weeks,
    weeklyStatistics,
    isPending,
    isError,
    isCreatingTask: createTask.isPending,
    isUpdatingTask: updateTask.isPending,
    createGoal,
    updateGoal,
    deleteGoal,
    createTask: createTask.mutateAsync,
    updateTask: updateTask.mutateAsync,
    deleteTask,
  };
};
