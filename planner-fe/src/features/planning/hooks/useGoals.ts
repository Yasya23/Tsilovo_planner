import toast from 'react-hot-toast';

import { useTranslations } from 'next-intl';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { queries } from '@/features/planning/constants/queries';
import { GoalServices } from '@/features/planning/services/goals.service';

export const useGoalLogic = () => {
  const t = useTranslations('Common.planning');
  const queryClient = useQueryClient();

  const createGoal = useMutation({
    mutationFn: GoalServices.create,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: [queries.planning] }),
    onError: () => toast.error(t('createGoal.error')),
  });

  const updateGoal = useMutation({
    mutationFn: GoalServices.update,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: [queries.planning] }),
    onError: () => toast.error(t('updateGoal.error')),
  });

  const deleteGoal = useMutation({
    mutationFn: GoalServices.delete,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: [queries.planning] }),
    onError: () => toast.error(t('deleteGoal.error')),
  });

  return {
    createGoal: createGoal.mutateAsync,
    updateGoal: updateGoal.mutateAsync,
    deleteGoal: deleteGoal.mutateAsync,
  };
};
