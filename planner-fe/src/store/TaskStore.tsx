import { create } from 'zustand';
import { WeekTasks, TotalTasks } from '@/types/tasks.type';
import { TaskService } from '@/services/task.service';
import { defaultWeekTasks } from '@/constants/defaultWeekTasks';

interface TaskState {
  tasks: WeekTasks | null;
  moode: string | null;
  statistics: TotalTasks | null;
  pdfMode: boolean;
  isLoading: boolean;
  error: boolean;
  updateTask: (
    tasks: WeekTasks,
    isAuth: boolean,
    weekNumber?: number
  ) => Promise<void>;
  setPdfMode: (mode: boolean) => void;
  setMoode: (moode: string) => void;
  setTasks: (weekNumber: number, isAuth: boolean) => void;
  getAllTasks: (isAuth: boolean) => void;
}

export const useTaskStore = create<TaskState>((set) => ({
  tasks: null,
  moode: null,
  isLoading: false,
  pdfMode: false,
  statistics: null,
  error: false,

  setTasks: async (weekNumber: number, isAuth: boolean) => {
    try {
      set({ isLoading: true, error: false });

      if (isAuth) {
        const data = await TaskService.getCurrentWeek(weekNumber);
        set({ tasks: data, isLoading: false });
      }
    } catch (error) {
      console.error('Failed to fetch tasks:', error);
      set({ tasks: defaultWeekTasks, isLoading: false, error: true });
    }
  },

  setMoode: (moode: string) => set({ moode }),

  getAllTasks: async (isAuth: boolean) => {
    try {
      set({ isLoading: true, error: false });

      if (isAuth) {
        const data = await TaskService.getAll();
        set({ statistics: data, isLoading: false });
      }
    } catch (error) {
      console.error('Failed to fetch all tasks:', error);
      set({ statistics: null, isLoading: false, error: true });
    }
  },

  setPdfMode: (mode) => set({ pdfMode: mode }),

  updateTask: async (tasks: WeekTasks, isAuth: boolean) => {
    try {
      set({ isLoading: true, error: false });

      if (isAuth) {
        const data = await TaskService.update(tasks);

        if (data) {
          set({ tasks: data, isLoading: false });
        }
      }
    } catch (error) {
      console.error('Failed to update tasks:', error);
      set({ isLoading: false, error: true });
    }
  },
}));

export default useTaskStore;
