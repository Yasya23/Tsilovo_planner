import { WeekTasks } from '@/types/tasks.type';

export const defaultWeekTasks: WeekTasks = {
  id: '',
  week: 0,
  notes: ['', '', ''],
  dailyTasks: [
    {
      day: 'Monday',
      tasks: [
        { title: '', isCompleted: false },
        { title: '', isCompleted: false },
        { title: '', isCompleted: false },
      ],
    },
    {
      day: 'Tuesday',
      tasks: [
        { title: '', isCompleted: false },
        { title: '', isCompleted: false },
        { title: '', isCompleted: false },
      ],
    },
    {
      day: 'Wednesday',
      tasks: [
        { title: '', isCompleted: false },
        { title: '', isCompleted: false },
        { title: '', isCompleted: false },
      ],
    },
    {
      day: 'Thursday',
      tasks: [
        { title: '', isCompleted: false },
        { title: '', isCompleted: false },
        { title: '', isCompleted: false },
      ],
    },
    {
      day: 'Friday',
      tasks: [
        { title: '', isCompleted: false },
        { title: '', isCompleted: false },
        { title: '', isCompleted: false },
      ],
    },
    {
      day: 'Saturday',
      tasks: [
        { title: '', isCompleted: false },
        { title: '', isCompleted: false },
        { title: '', isCompleted: false },
      ],
    },
    {
      day: 'Sunday',
      tasks: [
        { title: '', isCompleted: false },
        { title: '', isCompleted: false },
        { title: '', isCompleted: false },
      ],
    },
  ],
  statistics: {
    completedTasks: 0,
    totalTasks: 0,
  },
};
