import toast from 'react-hot-toast';

import { useTranslations } from 'next-intl';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { queries } from '@/features/planning/constants/queries';
import { TaskServices } from '@/features/planning/services/tasks.service';
import { ActiveGoalsData } from '@/features/planning/types/goals.type';
import { Task } from '@/features/planning/types/task.type';

export const useTask = () => {
  const t = useTranslations('Common.planning');
  const queryClient = useQueryClient();

  const createTask = useMutation({
    mutationFn: TaskServices.create,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: [queries.planning] }),
    onError: () => toast.error(t('createTask.error')),
  });

  const updateTask = useMutation({
    mutationFn: TaskServices.update,
    onMutate: async (newTask: Task) => {
      await queryClient.cancelQueries({ queryKey: [queries.planning] });
      const previousData = queryClient.getQueryData([queries.planning]);
      queryClient.setQueryData(
        [queries.planning],
        (oldData: ActiveGoalsData) => ({
          ...oldData,
          tasks: oldData.tasks.map((task) =>
            task._id === newTask._id ? { ...task, ...newTask } : task
          ),
        })
      );
      return { previousData };
    },
    onError: (_err, _vars, context) => {
      queryClient.setQueryData([queries.planning], context?.previousData);
      toast.error(t('updateTask.error'));
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: [queries.planning] }),
  });

  const deleteTask = useMutation({
    mutationFn: TaskServices.delete,
    onMutate: async (deletedTaskId: string) => {
      await queryClient.cancelQueries({ queryKey: [queries.planning] });

      const previousData = queryClient.getQueryData([queries.planning]);

      queryClient.setQueryData(
        [queries.planning],
        (oldData: ActiveGoalsData) => ({
          ...oldData,
          tasks: oldData.tasks.filter((task) => task._id !== deletedTaskId),
        })
      );
      return { previousData };
    },
    onError: (_err, _vars, context) => {
      queryClient.setQueryData([queries.planning], context?.previousData);
      toast.error(t('deleteTask.error'));
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: [queries.planning] }),
  }).mutate;

  return {
    createTask: createTask.mutateAsync,
    isCreatingTask: createTask.isPending,
    updateTask: updateTask.mutateAsync,
    isUpdatingTask: updateTask.isPending,
    deleteTask: deleteTask,
  };
};
