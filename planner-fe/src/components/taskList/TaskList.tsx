import TaskItem from '../taskItem/TaskItem';
import { Task } from '@/types/interfaces/task';
import styles from './taskList.module.scss';

interface TaskListProps {
  completedTasks: Task[];
  nonCompletedTasks: Task[];
}

const noTasksMessage = (
  <p className={styles.message}>Немає зроблених завдань...</p>
);

const TaskList = ({ completedTasks, nonCompletedTasks }: TaskListProps) => {
  return (
    <div className={styles.wrapper}>
      <div>
        <h3 className={styles.title}>Список завдань</h3>
        {nonCompletedTasks.length > 0
          ? nonCompletedTasks.map((task) => (
              <TaskItem key={task._id} task={task} />
            ))
          : noTasksMessage}
      </div>
      <div>
        <h3 className={styles.title}>Список зроблених завдань</h3>
        {completedTasks.length > 0
          ? completedTasks.map((task) => (
              <TaskItem key={task._id} task={task} />
            ))
          : noTasksMessage}
      </div>
    </div>
  );
};

export default TaskList;
