import { axiosClassic } from '@/api/interceptors';

import { UserStatistics } from '../types/statistics.type';

const api = '/statistics';

export const getStatistics = async (year: string): Promise<UserStatistics> => {
  const { data } = await axiosClassic.get<UserStatistics>(api, {
    params: year ? { year } : {},
  });

  console.log('Statistics data', data);

  return data;
};
