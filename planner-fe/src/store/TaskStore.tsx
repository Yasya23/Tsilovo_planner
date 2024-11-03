import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Task } from '@/types/interfaces/task';
import { TaskService } from '@/services/task.service';

interface TaskState {
  tasks: Task[] | null;
  pdfMode: boolean;
  isLoading: boolean;
  addTask: (task: any) => Promise<void>;
  removeTask: (taskId: string) => void;
  setPdfMode: (mode: boolean) => void;
  setTasks: () => void;
}

export const useTaskStore = create<TaskState>((set) => ({
  tasks: null,
  isLoading: false,
  pdfMode: false,
  setTasks: async () => {
    try {
      set({ isLoading: true });
      const data = await TaskService.getAll();
      set({ tasks: data || [], isLoading: false });
    } catch (error) {
      console.error('Failed to fetch tasks:', error);
      set({ tasks: [], isLoading: false });
    }
  },
  setPdfMode: (mode) => set({ pdfMode: mode }),

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
}));

export default useTaskStore;
