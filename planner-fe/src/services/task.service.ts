import { services } from '@/constants/services';
import { axiosClassic } from '@/api/interceptors';
import { Task } from '@/types/interfaces/task';

function getCurrentDateFormatted() {
  const date = new Date();
  return `${String(date.getDate()).padStart(2, '0')}/${String(
    date.getMonth() + 1
  ).padStart(2, '0')}/${String(date.getFullYear()).slice(-2)}`;
}

export const TaskService = {
  async getAll() {
    console.log(typeof getCurrentDateFormatted());

    const data = await axiosClassic.get<Task[]>(services.task, {
      params: {
        dueDate: getCurrentDateFormatted(),
      },
    });
    return data.data;
  },

  async add({}) {
    return await axiosClassic.get(services.task);
  },

  async remove(id: string) {
    return await axiosClassic.get(services.task);
  },
};
