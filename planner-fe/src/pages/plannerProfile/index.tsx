import TaskList from '@/features/tasks/taskList/TaskList';

import Layout from './layout';

import styles from './Planner.module.scss';

export const Planner = () => {
  return (
    <Layout>
      <div className={styles.Container}>
        <div className={styles.Top}>
          <div className={styles.WeekDates}>Тиждень</div>
          <div className={styles.Download}></div>
        </div>
        <TaskList />
      </div>
    </Layout>
  );
};

export default Planner;
