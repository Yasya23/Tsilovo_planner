import { axiosAuth } from '@/api/interceptors';

import { services } from '@/features/planning/constants/api-services';
import {
  ActiveGoalsData,
  CreateGoal,
  Goal,
} from '@/features/planning/types/goals.type';

export const GoalServices = {
  async getActive() {
    const { data } = await axiosAuth.get<ActiveGoalsData>(services.goals);

    return data;
  },

  async create(goal: CreateGoal) {
    const { data } = await axiosAuth.post<Goal>(services.goals, {
      ...goal,
    });
    return data;
  },

  async update(goal: Goal): Promise<Goal> {
    const { data } = await axiosAuth.put(services.goals, {
      ...goal,
    });
    return data;
  },

  async delete(goal: Goal): Promise<void> {
    await axiosAuth.delete(services.goals, { data: goal });
  },
};
