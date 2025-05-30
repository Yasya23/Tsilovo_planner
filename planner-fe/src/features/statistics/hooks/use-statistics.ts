import { useQuery } from '@tanstack/react-query';

import { getStatistics } from '../services/statistics.service';
import { UserStatistics } from '../types/statistics.type';

export const useStatistics = (year: string) => {
  const { data, isPending, isError } = useQuery<UserStatistics>({
    queryKey: ['user-statistics', year],
    queryFn: () => getStatistics(year),
    refetchOnWindowFocus: false,
  });

  return {
    data,
    isPending,
    isError,
  };
};
