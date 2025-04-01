import WeeklyTodo from '@/features/planning/components/weekly-todo/WeeklyTodo';
import GoalsList from '@/features/planning/components/goals-list/GoalsList';
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
