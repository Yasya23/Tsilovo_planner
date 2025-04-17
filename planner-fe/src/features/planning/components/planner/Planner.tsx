'use client';

import { useTranslations } from 'next-intl';

import { ErrorMessage } from '@/shared/components/ui/errorMessage/ErrorMessage';

import { Skeleton } from '@/features/planning/components/./_parts/skeleton/Skeleton';
import { GoalsList } from '@/features/planning/components/goals-list/GoalsList';
import { WeeklyStatistic } from '@/features/planning/components/weekly-statistic/WeeklyStatistic';
import { WeeklyTodo } from '@/features/planning/components/weekly-todo/WeeklyTodo';
import { PlanningContext } from '@/features/planning/context/usePlanningContext';
import { usePlanning } from '@/features/planning/hooks/usePlanning';

import styles from './Planner.module.scss';

export const Planner = () => {
  const t = useTranslations('Common.planning');
  const {
    weeklyStatistics,
    activeGoals,
    currentWeek,
    nextWeek,
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
      value={{ activeGoals, createTask, updateTask, deleteTask }}
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
        <WeeklyTodo
          weeks={nextWeek ? [currentWeek, nextWeek] : [currentWeek]}
        />
      </div>
    </PlanningContext.Provider>
  );
};
