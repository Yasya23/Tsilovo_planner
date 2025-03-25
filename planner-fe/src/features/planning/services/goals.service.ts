import { services } from '@/shared/constants/api-services';
import { axiosClassic } from '@/api/interceptors';
import { CreateGoal, Goal, ActiveGoals } from '../types/goals.type';

export const GoalServices = {
  async getActive() {
    const { data } = await axiosClassic.get<ActiveGoals>(services.activeGoals);

    return data;
  },

  async create(goal: CreateGoal) {
    const { data } = await axiosClassic.post<Goal>(services.activeGoals, {
      ...goal,
    });
    return data;
  },

  async update(goal: Goal): Promise<Goal> {
    const { data } = await axiosClassic.put(services.activeGoals, {
      ...goal,
    });
    return data;
  },

  async delete(goal: Goal): Promise<void> {
    await axiosClassic.delete(services.activeGoals, { data: goal });
  },
};
