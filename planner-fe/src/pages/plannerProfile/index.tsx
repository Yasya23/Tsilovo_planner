import WeeklyTodo from '@/features/planning/components/weeklyTodo/WeeklyTodo';
import GoalsList from '@/features/planning/components/goalsList/GoalsList';
import styles from './Planner.module.scss';

export const Planner = () => {
  return (
    <div className={styles.Container}>
      <h1 className={styles.Title}>Weekly to-do</h1>
      <GoalsList />
      <WeeklyTodo />
    </div>
  );
};

export default Planner;
