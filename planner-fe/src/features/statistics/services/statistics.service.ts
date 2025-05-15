import { axiosClassic } from '@/api/interceptors';

import { services } from '@/features/statistics/constants/api-services';

import { UserStatistics } from '../types/statistics.type';

export const getStatistics = async (year: string): Promise<UserStatistics> => {
  const { data } = await axiosClassic.get<UserStatistics>(services.statistics, {
    params: year ? { year } : {},
  });

  return data;
};
