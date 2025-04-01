'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { usePlanning } from '@/features/planning/hooks/usePlanning';
import { createTitle } from '@/features/planning/helpers/create-week-title';
import { filterDays } from '@/features/planning/helpers/filter-days';

import icons from '@/shared/icons/icons';
import IconButton from '@/shared/components/ui/buttons/IconButton';
import WeeklyList from '@/features/planning/components/weekly-task-list/WeeklyList';

import styles from './index.module.scss';

export const WeeklyTodo = () => {
  const { currentWeek, nextWeek, activeGoals } = usePlanning();
  const [isListView, setIsListView] = useState(false);
  const [prioritizeTaskDays, setPrioritizeTaskDays] = useState(false);

  const t = useTranslations('Common');
  const weeks = nextWeek ? [currentWeek, nextWeek] : [currentWeek];

  return (
    <section className={styles.WeeklyTodo}>
      {weeks.map((week) => (
        <div
          key={week[0]?.date || 'empty-week'}
          className={styles.WeekContainer}>
          <div className={styles.Header}>
            <h2 className={styles.Title}>{createTitle(week, t)}</h2>
            <ul className={styles.FilterList}>
              <li className={isListView ? styles.Active : ''}>
                <IconButton
                  icon={<icons.List />}
                  name={t('buttons.list')}
                  onClick={() => setIsListView((prev) => !prev)}
                />
              </li>
              <li className={prioritizeTaskDays ? styles.Active : ''}>
                <IconButton
                  icon={<icons.Sunrise />}
                  name={t('buttons.daysWithTasksFirst')}
                  onClick={() => setPrioritizeTaskDays((prev) => !prev)}
                />
              </li>
            </ul>
          </div>

          <WeeklyList
            tasks={prioritizeTaskDays ? filterDays(week) : week}
            activeGoals={activeGoals}
            isListView={isListView}
          />
        </div>
      ))}
    </section>
  );
};

export default WeeklyTodo;
