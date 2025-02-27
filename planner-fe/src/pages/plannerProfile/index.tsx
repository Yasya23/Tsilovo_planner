import TaskList from '@/features/tasks/taskList/TaskList';

import styles from './Planner.module.scss';

export const Planner = () => {
  return (
    <div className={styles.Container}>
      <div className={styles.Top}>
        <div className={styles.WeekDates}>Тиждень</div>
        <div className={styles.Download}></div>
      </div>
      <TaskList />
    </div>
  );
};

export default Planner;
