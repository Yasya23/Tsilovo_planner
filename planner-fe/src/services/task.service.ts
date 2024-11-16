import { services } from '@/constants/services';
import { axiosClassic } from '@/api/interceptors';
import { TotalTasks, WeekTasks } from '@/types/tasks.type';

export const TaskService = {
  async getAll() {
    const data = await axiosClassic.get<TotalTasks>(services.allTasks);
    return data.data;
  },

  async getCurrentWeek(week: number) {
    const data = await axiosClassic.get<WeekTasks>(services.currentWeekTasks, {
      params: { currentweek: week },
    });
    return data.data;
  },

  async update(tasks: WeekTasks): Promise<WeekTasks> {
    return await axiosClassic.put(services.currentWeekTasks, {
      tasks,
    });
  },
};
