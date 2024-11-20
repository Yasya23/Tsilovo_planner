import { create } from 'zustand';
import { WeekTasks, TotalTasks } from '@/types/tasks.type';
import { TaskService } from '@/services/task.service';
import { defaultWeekTasks } from '@/constants/defaultWeekTasks';

interface TaskState {
  tasks: WeekTasks | null;
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
  setTasks: (weekNumber: number, isAuth: boolean) => void;
  getAllTasks: (isAuth: boolean) => void;
  cleanTasks: () => void;
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
        set({ tasks: data, isLoading: false });
      } else {
        const storedTasks = localStorage.getItem('weekTasks');
        const currentWeekNumber = weekNumber;

        if (storedTasks) {
          const parsedTasks = JSON.parse(storedTasks);

          if (parsedTasks.weekNumber === currentWeekNumber) {
            set({ tasks: parsedTasks, isLoading: false });
          } else {
            const updatedTasks = {
              ...defaultWeekTasks,
              weekNumber: currentWeekNumber,
            };
            localStorage.setItem('weekTasks', JSON.stringify(updatedTasks));
            set({ tasks: updatedTasks, isLoading: false });
          }
        } else {
          const initialTasks = {
            ...defaultWeekTasks,
            weekNumber: currentWeekNumber,
          };
          localStorage.setItem('weekTasks', JSON.stringify(initialTasks));
          set({ tasks: initialTasks, isLoading: false });
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
        const storedTasks = localStorage.getItem('weekTasks');
        if (storedTasks) {
          set({ statistics: JSON.parse(storedTasks), isLoading: false });
          set({ statistics: null, isLoading: false });
        }
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
      } else {
        if (typeof window !== 'undefined') {
          const totalTasks = tasks.dailyTasks.reduce((total, dayTask) => {
            return total + dayTask.tasks.filter((task) => task.title).length;
          }, 0);

          const completedTasks = tasks.dailyTasks.reduce(
            (completed, dayTask) => {
              return (
                completed +
                dayTask.tasks.filter((task) => task.isCompleted).length
              );
            },
            0
          );

          const updatedTasks = {
            ...tasks,
            statistics: {
              completedTasks,
              totalTasks,
            },
          };

          localStorage.setItem('weekTasks', JSON.stringify(updatedTasks));
          set({ tasks: updatedTasks, isLoading: false });
        }
      }
    } catch (error) {
      console.error('Failed to update tasks:', error);
      set({ isLoading: false, error: true });
    }
  },
  cleanTasks: () => set({ tasks: null }),
}));

export default useTaskStore;
