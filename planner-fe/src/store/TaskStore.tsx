import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Task } from '@/types/interfaces/task';
import { TaskService } from '@/services/task.service';

interface TaskState {
  tasks: Task[] | null;
  addTask: (task: any) => Promise<void>;
  removeTask: (taskId: string) => void;
  setTasks: () => void;
}

const useTaskStore = create<TaskState>((set) => ({
  tasks: null,

  addTask: async (task: any) => {
    // const data = await TaskService.add(task);
    // if (data?.task) {
    //   set((state) => ({
    //     tasks: [...state.tasks, data.task],
    //   }));
    // }
  },

  removeTask: async (taskId: string) => {
    // const data = await TaskService.remove(taskId);
    // if (data?.task) {
    //   set((state) => ({
    //     tasks: state.tasks.filter((task) => task.id !== taskId),
    //   }));
    // }
  },
  setTasks: async () => {
    try {
      const data = await TaskService.getAll();
      set({ tasks: data || [] });
    } catch (error) {
      console.error('Failed to fetch tasks:', error);
    }
  },
}));

export default useTaskStore;
