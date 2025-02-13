'use client';

import TaskItem from '../taskItem/TaskItem';
import { WeekTasks, Task, Note } from '@/types/tasks.type';
import { useTaskStore } from '@/store';
import { daysMap } from '@/constants/daysMap';

import styles from './taskList.module.scss';

interface TaskListProps {
  tasks: WeekTasks;
  onUpdateTasks: (updatedTasks: WeekTasks) => void;
}

export const TaskList = ({ tasks, onUpdateTasks }: TaskListProps) => {
  const { pdfMode } = useTaskStore();
  const handleUpdateTask = (day: string, index: number, updatedTask: Task) => {
    const updatedDailyTasks = tasks.dailyTasks.map((dayTasks) =>
      dayTasks.day === day
        ? {
            ...dayTasks,
            tasks: dayTasks.tasks.map((task, i) =>
              i === index ? updatedTask : task
            ),
          }
        : dayTasks
    );

    onUpdateTasks({ ...tasks, dailyTasks: updatedDailyTasks });
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.tasksWrapper}>
        {tasks.dailyTasks.map((dayTask) => {
          const ukrainianDay = daysMap[dayTask.day] || dayTask.day;

          return (
            <div key={dayTask.day} className={styles.tasksContainer}>
              <h3>{ukrainianDay}</h3>
              <div className={styles.tasks}>
                {dayTask.tasks.map((task, taskIndex) => (
                  <TaskItem
                    key={`${dayTask.day}-${taskIndex}`}
                    task={task}
                    title={task.title}
                    onUpdate={(updatedTask) =>
                      handleUpdateTask(
                        dayTask.day,
                        taskIndex,
                        updatedTask as Task
                      )
                    }
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TaskList;
