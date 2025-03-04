import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { GoalServices } from '../services/goals.service';

export const useGoals = () => {
  const queryClient = useQueryClient();

  const {
    data: goals,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['activeGoals'],
    queryFn: GoalServices.getActive,
  });

  const createGoal = useMutation({
    mutationFn: GoalServices.create,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ['activeGoals'] }),
  }).mutate;

  const updateGoal = useMutation({
    mutationFn: GoalServices.update,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ['activeGoals'] }),
  }).mutate;

  const deleteGoal = useMutation({
    mutationFn: GoalServices.delete,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ['activeGoals'] }),
  }).mutate;

  return { goals, isLoading, isError, createGoal, updateGoal, deleteGoal };
};
