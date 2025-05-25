import toast from 'react-hot-toast';

import { useTranslations } from 'next-intl';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { queries } from '@/features/planning/constants/queries';
import { GoalServices } from '@/features/planning/services/goals.service';
import { ActiveGoalsData, Goal } from '@/features/planning/types/goals.type';

export const useGoalLogic = () => {
  const t = useTranslations('Common.planning');
  const queryClient = useQueryClient();

  const createGoal = useMutation({
    mutationFn: GoalServices.create,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: [queries.planning] }),
    onError: () => {
      toast.error(t('createGoal.error'));
    },
  });

  const updateGoal = useMutation({
    mutationFn: GoalServices.update,
    onMutate: async (updatedGoal: Goal) => {
      await queryClient.cancelQueries({ queryKey: [queries.planning] });

      const previousData = queryClient.getQueryData([queries.planning]);
      queryClient.setQueryData(
        [queries.planning],
        (oldData: ActiveGoalsData) => ({
          ...oldData,
          activeGoals: oldData?.activeGoals.map((goal: Goal) =>
            goal._id === updatedGoal._id ? { ...goal, ...updatedGoal } : goal
          ),
        })
      );
      return { previousData };
    },
    onError: (_err, _vars, context) => {
      queryClient.setQueryData([queries.planning], context?.previousData);
      toast.error(t('updateGoal.error'));
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [queries.planning] });
    },
  });

  const deleteGoal = useMutation({
    mutationFn: GoalServices.delete,
    onMutate: async (goalId: string) => {
      await queryClient.cancelQueries({ queryKey: [queries.planning] });

      const previousData = queryClient.getQueryData([queries.planning]);

      queryClient.setQueryData(
        [queries.planning],
        (oldData: ActiveGoalsData) => ({
          ...oldData,
          activeGoals: oldData.activeGoals.filter(
            (goal) => goal._id !== goalId
          ),
        })
      );
      return { previousData };
    },
    onError: (_err, _vars, context) => {
      queryClient.setQueryData([queries.planning], context?.previousData);
      toast.error(t('deleteGoal.error'));
    },
  });

  return {
    createGoal: createGoal.mutate,
    updateGoal: updateGoal.mutate,
    deleteGoal: deleteGoal.mutate,
    isPending:
      createGoal.isPending || updateGoal.isPending || deleteGoal.isPending,
  };
};
