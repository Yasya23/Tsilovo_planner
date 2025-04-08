'use client';

import WeeklyTodo from '../weekly-todo/WeeklyTodo';
import GoalsList from '../goals-list/GoalsList';
import { WeeklyStatistic } from '../weekly-statistic/WeeklyStatistic';
import { usePlanning } from '../../hooks/usePlanning';
import { useTranslations } from 'next-intl';
import Skeleton from '../_parts/skeleton/Skeleton';
import { ErrorMessage } from '@/shared/components/ui/errorMessage/ErrorMessage';

import styles from './Planner.module.scss';

export const Planner = () => {
  const t = useTranslations('Common.planning');
  const {
    data,
    weeklyStatistics,
    activeGoals,
    currentWeek,
    nextWeek,
    createGoal,
    updateGoal,
    deleteGoal,
    isError,
    isLoading,
  } = usePlanning();

  if (isLoading) return <Skeleton />;

  if (isError || !data) return <ErrorMessage message={t('error')} />;

  return (
    <div className={styles.Planner}>
      <h1 className={styles.Title}>{t('title')}</h1>
      <div className={styles.Header}>
        <GoalsList
          activeGoals={activeGoals}
          createGoal={createGoal}
          updateGoal={updateGoal}
          deleteGoal={deleteGoal}
        />
        <WeeklyStatistic
          statistics={weeklyStatistics}
          isError={isError}
          isLoading={isLoading}
        />
      </div>
      <WeeklyTodo
        activeGoals={activeGoals}
        currentWeek={currentWeek}
        nextWeek={nextWeek}
      />
    </div>
  );
};

export default Planner;
