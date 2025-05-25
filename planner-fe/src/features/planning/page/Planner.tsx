'use client';

import { useTranslations } from 'next-intl';

import { useAuthContext } from '@/shared/providers/AuthProvider';

import { GoalsList } from '@/features/planning/components/goals/goals-list/GoalsList';
import { Skeleton } from '@/features/planning/components/skeleton/Skeleton';
import { WeeklyTodo } from '@/features/planning/components/tasks/weekly-todo/WeeklyTodo';
import { WeeklyStatistic } from '@/features/planning/components/weekly-statistic/WeeklyStatistic';
import { usePlanning } from '@/features/planning/hooks/usePlanning';

import styles from './Planner.module.scss';

export const Planner = () => {
  const t = useTranslations('Common.planning');
  const { weeklyStatistics, activeGoals, isError, isPending } = usePlanning();
  const { logout } = useAuthContext();

  if (isError && !activeGoals) logout();

  return (
    <div className={styles.Planner}>
      <h1 className={styles.Title}>{t('title')}</h1>
      {isPending ? (
        <Skeleton />
      ) : (
        <>
          <div className={styles.Header}>
            <GoalsList activeGoals={activeGoals} />
            <WeeklyStatistic statistics={weeklyStatistics} />
          </div>
          <WeeklyTodo />
        </>
      )}
    </div>
  );
};
