import { Task } from '@/features/statistics/types/statistics.type';

import styles from './TasksList.module.scss';

export const TasksList = ({ tasks }: { tasks: Task[] }) => {
  if (!tasks) return null;

  return (
    <ol className={styles.Tasks}>
      {tasks.map((task) => (
        <li key={task.title} className={styles.Task}>
          {task.title}
        </li>
      ))}
    </ol>
  );
};
