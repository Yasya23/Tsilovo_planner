import { useQuery } from '@tanstack/react-query';
import { getStatistics } from '../services/statistics.service';
import { UserStatistics } from '../types/statistics.type';

export const useStatistics = (year: string) => {
  const { data, isPending, isError, refetch } = useQuery<UserStatistics>({
    queryKey: ['user-statistics', year],
    queryFn: () => getStatistics(year),
    staleTime: 1000 * 60 * 60 * 6,
    refetchOnWindowFocus: false,
  });

  return {
    refetch,
    data,
    isPending,
    isError,
  };
};
