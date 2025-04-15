import { services } from '@/shared/constants/api-services';
import { axiosAuth } from '@/api/interceptors';
import { CreateGoal, Goal, ActiveGoalsData } from '../types/goals.type';

export const GoalServices = {
  async getActive() {
    const { data } = await axiosAuth.get<ActiveGoalsData>(services.activeGoals);

    return data;
  },

  async create(goal: CreateGoal) {
    const { data } = await axiosAuth.post<Goal>(services.activeGoals, {
      ...goal,
    });
    return data;
  },

  async update(goal: Goal): Promise<Goal> {
    const { data } = await axiosAuth.put(services.activeGoals, {
      ...goal,
    });
    return data;
  },

  async delete(goal: Goal): Promise<void> {
    await axiosAuth.delete(services.activeGoals, { data: goal });
  },
};
