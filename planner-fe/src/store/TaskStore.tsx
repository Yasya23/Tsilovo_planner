import { create } from 'zustand';
import { WeekTasks, TotalTasks } from '@/types/tasks.type';
import { TaskService } from '@/services/task.service';
interface TaskState {
  tasks: WeekTasks | null | {};
  statistics: TotalTasks | null | {};
  pdfMode: boolean;
  isLoading: boolean;
  error: boolean;
  updateTask: (task: WeekTasks) => Promise<void>;
  setPdfMode: (mode: boolean) => void;
  setTasks: (weekNumber: number) => void;
  getAllTasks: () => void;
}

export const useTaskStore = create<TaskState>((set) => ({
  tasks: null,
  isLoading: false,
  pdfMode: false,
  statistics: null,
  error: false,
  setTasks: async (weekNumber: number) => {
    try {
      set({ isLoading: true, error: false });
      const data = await TaskService.getCurrentWeek(weekNumber);
      set({ tasks: data, isLoading: false });
    } catch (error) {
      console.error('Failed to fetch tasks:', error);
      set({ tasks: {}, isLoading: false, error: true });
    }
  },
  getAllTasks: async () => {
    try {
      set({ isLoading: true, error: false });
      const data = await TaskService.getAll();
      set({ statistics: data, isLoading: false });
    } catch (error) {
      console.error('Failed to fetch tasks:', error);
      set({ statistics: {}, isLoading: false, error: true });
    }
  },

  setPdfMode: (mode) => set({ pdfMode: mode }),

  updateTask: async (task: WeekTasks) => {
    try {
      set({ isLoading: true, error: false });
      const data = await TaskService.update(task);
      if (data) {
        set({ tasks: data, isLoading: false });
      }
    } catch (error) {
      console.error('Failed to fetch tasks:', error);
      set({ isLoading: false, error: true });
    }
  },
}));

export default useTaskStore;
