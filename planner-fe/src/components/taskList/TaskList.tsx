import { TaskItem } from '@/components';
import { Task } from '@/types/interfaces/task';

import styles from './taskList.module.scss';
interface TaskListProps {
  tasks: Task[] | null;
}

const noTasksMessage = <p className={styles.message}>Немає завдань ...</p>;

export const TaskList = ({ tasks }: TaskListProps) => {
  console.log(tasks);
  return (
    <div className={styles.wrapper}>
      <h3 className={styles.title}>Список завдань</h3>

      {tasks?.length && tasks.length > 0
        ? tasks.map((task) => <TaskItem key={task._id} task={task} />)
        : noTasksMessage}
    </div>
  );
};

export default TaskList;
