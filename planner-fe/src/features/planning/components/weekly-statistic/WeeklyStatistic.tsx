'use client';

import { usePlanning } from '../../hooks/usePlanning';
import Spinner from '@/shared/components/ui/Spinner';
import styles from './WeeklyStatistic.module.scss';
export const WeeklyStatistic = () => {
  const { weeklyStatistics } = usePlanning();

  if (!weeklyStatistics)
    return (
      <div className={styles.Statistic}>
        <Spinner />
      </div>
    );

  return (
    <div className={styles.Statistic}>
      <div className={styles.Wrapper}>
        <h2 className={styles.Title}>Weekly Statistic</h2>
        <p className={styles.SubTitle}>
          Completed 💪: <span>{weeklyStatistics.completedTasks}</span>
        </p>
        <p className={styles.SubTitle}>
          To-do 📆: <span>{weeklyStatistics.notCompletedTasks}</span>
        </p>
      </div>
    </div>
  );
};
