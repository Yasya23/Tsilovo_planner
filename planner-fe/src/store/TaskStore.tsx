import { create } from 'zustand';
import { WeekTasks, TotalTasks, DailyTask } from '@/types/tasks.type';
import { TaskService } from '@/services/task.service';
import { defaultWeekTasks } from '@/constants/defaultWeekTasks';

interface TaskState {
  tasks: WeekTasks | null;
  statistics: TotalTasks | null;
  pdfMode: boolean;
  isLoading: boolean;
  error: boolean;
  updateTask: (tasks: WeekTasks, isAuth: boolean) => Promise<void>;
  setPdfMode: (mode: boolean) => void;
  setTasks: (weekNumber: number, isAuth: boolean) => void;
  getAllTasks: (isAuth: boolean) => void;
}

export const useTaskStore = create<TaskState>((set) => ({
  tasks: null,
  isLoading: false,
  pdfMode: false,
  statistics: null,
  error: false,

  setTasks: async (weekNumber: number, isAuth: boolean) => {
    try {
      set({ isLoading: true, error: false });

      if (isAuth) {
        const data = await TaskService.getCurrentWeek(weekNumber);
        set({ tasks: data ?? defaultWeekTasks, isLoading: false });
      } else {
        const storedTasks = localStorage.getItem('weekTasks');
        if (storedTasks) {
          set({ tasks: JSON.parse(storedTasks), isLoading: false });
        } else {
          localStorage.setItem('weekTasks', JSON.stringify(defaultWeekTasks));
          set({ tasks: defaultWeekTasks, isLoading: false });
        }
      }
    } catch (error) {
      console.error('Failed to fetch tasks:', error);
      set({ tasks: defaultWeekTasks, isLoading: false, error: true });
    }
  },

  getAllTasks: async (isAuth: boolean) => {
    try {
      set({ isLoading: true, error: false });

      if (isAuth) {
        const data = await TaskService.getAll();
        set({ statistics: data, isLoading: false });
      } else {
        console.warn('Statistics are not available for unauthenticated users.');
        set({ statistics: null, isLoading: false });
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
        const data = await TaskService.update(task);
        if (data) {
          set({ tasks: data, isLoading: false });
        }
      } else {
        if (typeof window !== 'undefined') {
          localStorage.setItem('weekTasks', JSON.stringify(tasks));
        }
        set({ tasks: tasks, isLoading: false });
      }
    } catch (error) {
      console.error('Failed to update tasks:', error);
      set({ isLoading: false, error: true });
    }
  },
}));

export default useTaskStore;
