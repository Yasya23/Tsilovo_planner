import { services } from '@/shared/constants/api-services';
import { axiosClassic } from '@/api/interceptors';
import { CreateTask, Task } from '../types/task.type';

export const TaskServices = {
  async create(tasks: CreateTask[]) {
    const { data } = await axiosClassic.post<Task[]>(services.tasks, { tasks });
    return data;
  },

  async update(tasks: Task[]): Promise<Task[]> {
    const { data } = await axiosClassic.put(services.tasks, { tasks });
    return data;
  },

  async delete(tasks: Task[]): Promise<void> {
    await axiosClassic.delete(services.tasks, { data: tasks });
  },
};
