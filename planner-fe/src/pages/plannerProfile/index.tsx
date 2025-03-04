import TaskList from '@/features/tasks/taskList/TaskList';
import GoalsList from '@/features/goals/components/GoalsList/GoalsList';
import styles from './Planner.module.scss';

export const Planner = () => {
  return (
    <div className={styles.Container}>
      <GoalsList />
      <div className={styles.Top}>
        <div className={styles.WeekDates}>Тиждень</div>
      </div>
      <TaskList />
    </div>
  );
};

export default Planner;
