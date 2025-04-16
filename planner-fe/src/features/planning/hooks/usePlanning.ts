import toast from 'react-hot-toast';

import { useTranslations } from 'next-intl';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { GoalServices } from '../services/goals.service';
import { TaskServices } from '../services/tasks.service';
import { ActiveGoalsData } from '../types/goals.type';

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
      toast.success(t('createTask.success'));
    },
    onError: () => toast.error(t('createTask.error')),
  }).mutate;

  const updateTask = useMutation({
    mutationFn: TaskServices.update,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['planning'] });
      toast.success(t('updateTask.success'));
    },
    onError: () => toast.error(t('updateTask.error')),
  }).mutate;

  const deleteTask = useMutation({
    mutationFn: TaskServices.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['planning'] });
      toast.success(t('deleteTask.success'));
    },

    onError: () => toast.error(t('deleteTask.error')),
  }).mutate;

  const createGoal = useMutation({
    mutationFn: GoalServices.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['planning'] });
      toast.success(t('createGoal.success'));
    },
    onError: () => toast.error(t('createGoal.error')),
  }).mutate;

  const updateGoal = useMutation({
    mutationFn: GoalServices.update,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['planning'] });
      toast.success(t('updateGoal.success'));
    },
    onError: () => toast.error(t('updateGoal.error')),
  }).mutate;

  const deleteGoal = useMutation({
    mutationFn: GoalServices.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['planning'] });
      toast.success(t('deleteGoal.success'));
    },
    onError: () => toast.error(t('deleteGoal.error')),
  }).mutate;

  const activeGoals = data?.activeGoals ?? [];
  const tasks = data?.weeklyTasks ?? [];
  const weeklyStatistics = data?.weeklyStatistics ?? null;
  // const todayStatistics = tasks.filter(task)
  const currentWeek = tasks.length > 7 ? tasks.slice(0, 7) : tasks;
  const nextWeek = tasks.length > 7 ? tasks.slice(7) : null;

  return {
    activeGoals,
    currentWeek,
    nextWeek,
    weeklyStatistics,
    isPending,
    isError,
    createGoal,
    updateGoal,
    deleteGoal,
    createTask,
    updateTask,
    deleteTask,
  };
};
