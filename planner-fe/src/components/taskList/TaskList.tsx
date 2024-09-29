import TaskItem from '../taskItem/TaskItem';
import { Task } from '@/types/interfaces/task';
import styles from './taskList.module.scss';

interface TaskListProps {
  tasks: Task[];
}

const TaskList = ({ tasks }: TaskListProps) => {
  const completedTasks = tasks.filter((task) => task.isCompleted);
  const nonCompletedTasks = tasks.filter((task) => !task.isCompleted);

  return (
    <div className={styles.wrapper}>
      <div>
        <h3 className={styles.title}>Список завдань</h3>
        {nonCompletedTasks.length > 0 ? (
          nonCompletedTasks.map((task) => (
            <TaskItem key={task.id} task={task} />
          ))
        ) : (
          <p className={styles.message}>Немає невиконаних завдань...</p>
        )}
      </div>
      <div>
        <h3 className={styles.title}>Список зроблених завдань</h3>
        {completedTasks.length > 0 ? (
          completedTasks.map((task) => <TaskItem key={task.id} task={task} />)
        ) : (
          <p className={styles.message}>Немає зроблених завдань...</p>
        )}
      </div>
    </div>
  );
};

export default TaskList;
