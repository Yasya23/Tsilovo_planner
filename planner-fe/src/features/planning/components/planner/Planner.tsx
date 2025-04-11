'use client';

import { WeeklyTodo } from '../weekly-todo/WeeklyTodo';
import GoalsList from '../goals-list/GoalsList';
import { WeeklyStatistic } from '../weekly-statistic/WeeklyStatistic';
import { usePlanning } from '../../hooks/usePlanning';
import { useTranslations } from 'next-intl';
import Skeleton from '../_parts/skeleton/Skeleton';
import { ErrorMessage } from '@/shared/components/ui/errorMessage/ErrorMessage';
import { PlanningContext } from '@/features/planning/context/usePlanningContext';

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
      value={{ activeGoals, createTask, updateTask, deleteTask }}>
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

export default Planner;
