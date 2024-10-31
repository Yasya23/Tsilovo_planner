import { TaskItem } from '@/components';
import { Task } from '@/types/interfaces/task';

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
  tasks: Task[] | null;
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
            <TaskItem task={null} />
            <TaskItem task={null} />
            <TaskItem task={null} />
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
      {/* {tasks?.length && tasks.length > 0 ? (
        tasks.map((task) => <TaskItem key={task._id} task={task} />)
      ) : (
          <TaskItem task={null} />

      )} */}
    </div>
  );
};

export default TaskList;
