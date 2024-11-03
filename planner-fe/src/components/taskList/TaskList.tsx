import { TaskItem } from '@/components';
import { WeekTasks } from '@/types/tasks.type';

import styles from './taskList.module.scss';

const days = [
  'Понеділок',
  'Вівторок',
  'Середа',
  'Четверг',
  'Пʼятниця',
  'Субота',
  'Неділя',
];
interface TaskListProps {
  tasks: WeekTasks | null;
}

export const TaskList = ({ tasks }: TaskListProps) => {
  console.log(tasks);
  return (
    <div className={styles.wrapper}>
      <h3 className={styles.title}>План Тижня</h3>
      <div className={styles.tasksWrapper}>
        <div className={styles.tasksContainer}>
          <h3>3 цілі тижня</h3>
          <div className={styles.tasks}>
            <TaskItem task={null} isNote={true} />
            <TaskItem task={null} isNote={true} />
            <TaskItem task={null} isNote={true} />
          </div>
        </div>
        {days.map((day) => {
          return (
            <div className={styles.tasksContainer}>
              <h3>{day}</h3>
              <div className={styles.tasks}>
                <TaskItem task={null} />
                <TaskItem task={null} />
                <TaskItem task={null} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TaskList;
