import WeeklyTodo from '../weekly-todo/WeeklyTodo';
import GoalsList from '../goals-list/GoalsList';
import { WeeklyStatistic } from '../weekly-statistic/WeeklyStatistic';
import styles from './Planner.module.scss';

export const Planner = () => {
  return (
    <div className={styles.Container}>
      <h1 className={styles.Title}>Weekly to-do</h1>
      <div className={styles.Wrapper}>
        <GoalsList />
        <WeeklyStatistic />
      </div>
      <WeeklyTodo />
    </div>
  );
};

export default Planner;
