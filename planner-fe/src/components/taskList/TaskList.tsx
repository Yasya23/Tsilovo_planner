'use client';

import { TaskItem } from '@/components';
import { WeekTasks, Task, Note } from '@/types/tasks.type';
import styles from './taskList.module.scss';
import { useTaskStore } from '@/store';
import { daysMap } from '@/constants/daysMap';
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

  const handleUpdateNote = (index: number, updatedNote: Note) => {
    const updatedNotes = tasks.notes.map((note, i) =>
      i === index ? updatedNote : note
    );
    onUpdateTasks({ ...tasks, notes: updatedNotes });
  };

  return (
    <div className={styles.wrapper}>
      <h3 className={styles.title}>Мій Тижневий Розклад</h3>
      <div className={styles.tasksWrapper}>
        <div className={styles.tasksContainer}>
          <h3>Нотатки</h3>
          <div className={styles.tasks}>
            {tasks.notes.map((note, index) => (
              <TaskItem
                key={`note-${index}`}
                title={note}
                isNote={true}
                onUpdate={(updatedNote) =>
                  handleUpdateNote(index, updatedNote as Note)
                }
              />
            ))}
          </div>
        </div>

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
      {pdfMode && (
        <div className={styles.linesWrapper}>
          <hr />
          <hr />
          <hr />
          <hr />
          <hr />
        </div>
      )}
    </div>
  );
};

export default TaskList;
