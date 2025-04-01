'use client';

import { useTranslations } from 'next-intl';
import { usePlanning } from '@/features/planning/hooks/usePlanning';
import { createTitle } from '@/features/planning/helpers/create-week-title';
import WeeklyList from '@/features/planning/components/weekly-task-list/WeeklyList';
import { filterDays } from '@/features/planning/helpers/filter-days';

import styles from './index.module.scss';

export const WeeklyTodo = () => {
  const { currentWeek, nextWeek, activeGoals } = usePlanning();
  const t = useTranslations('Common.months');

  const weeks = nextWeek ? [currentWeek, nextWeek] : [currentWeek];
  console.log(weeks);
  return (
    <section>
      {weeks.map((week) => {
        const sortedWeek = filterDays(week);

        return (
          <div key={week[0]?.date || `empty-week`}>
            <h2 className={styles.Subtitle}>{createTitle(week, t)}</h2>
            <WeeklyList tasks={sortedWeek} activeGoals={activeGoals} />
          </div>
        );
      })}
    </section>
  );
};

export default WeeklyTodo;
