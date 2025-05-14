'use client';

import { useTranslations } from 'next-intl';

import { ErrorMessage } from '@/shared/components/errorMessage/ErrorMessage';

import { GoalsList } from '@/features/planning/components/goals/goals-list/GoalsList';
import { Skeleton } from '@/features/planning/components/skeleton/Skeleton';
import { WeeklyTodo } from '@/features/planning/components/tasks/weekly-todo/WeeklyTodo';
import { WeeklyStatistic } from '@/features/planning/components/weekly-statistic/WeeklyStatistic';
import { PlanningContext } from '@/features/planning/context/usePlanningContext';
import { usePlanning } from '@/features/planning/hooks/usePlanning';

import styles from './Planner.module.scss';

export const Planner = () => {
  const t = useTranslations('Common.planning');
  const {
    weeklyStatistics,
    activeGoals,
    weeks,
    createGoal,
    updateGoal,
    deleteGoal,
    createTask,
    updateTask,
    deleteTask,
    isError,
    isPending,
  } = usePlanning();

  if (isPending) return <Skeleton />;

  if (isError) return <ErrorMessage message={t('error')} />;

  return (
    <PlanningContext.Provider
      value={{
        activeGoals,
        createTask,
        updateTask,
        deleteTask,
        isPending,
        weeks,
      }}
    >
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
            isPending={isPending}
          />
        </div>
        <WeeklyTodo />
      </div>
    </PlanningContext.Provider>
  );
};
