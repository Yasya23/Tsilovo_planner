import { axiosClassic } from '@/api/interceptors';

import { services } from '@/shared/constants/api-services';

import { CreateTask, Task } from '../types/task.type';

export const TaskServices = {
  async create(task: CreateTask) {
    const { data } = await axiosClassic.post<Task>(services.tasks, { ...task });
    return data;
  },

  async update(task: Task): Promise<Task[]> {
    const { data } = await axiosClassic.put(services.tasks, { ...task });
    return data;
  },

  async delete(_id: string): Promise<void> {
    await axiosClassic.delete(services.tasks, { data: { _id } });
  },
};
