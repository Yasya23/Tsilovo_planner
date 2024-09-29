import { services } from '@/constants/services';
import { axiosClassic } from '@/api/interceptors';
import { Task } from '@/types/interfaces/task';

export const TaskService = {
  async getAll() {
    const data = await axiosClassic.get<Task[]>(services.task);
    return data.data;
  },

  async add({}) {
    return await axiosClassic.get(services.task);
  },

  async remove(id: string) {
    return await axiosClassic.get(services.task);
  },
};
