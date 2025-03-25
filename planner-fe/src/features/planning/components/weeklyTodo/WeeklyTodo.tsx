'use client';

import { useState } from 'react';
import IconButtonCustom from '@/shared/components/ui/buttons/IconButton';
import CheckboxCustom from '@/shared/components/ui/Checkbox';
import icons from '@/shared/icons/icons';
import { useTranslations } from 'next-intl';
import styles from './WeeklyTodo.module.scss';
import { useGoals } from '@/features/planning/hooks/useGoals';

import WeeklyList from '../weeklyList/WeeklyList';

export const WeeklyTodo = () => {
  const { tasks, weekDates, nextWeekDates, createTitle } = useGoals();

  const t = useTranslations('months');

  const [isCompleted, setIsCompleted] = useState(false);

  const handleCheckboxChange = () => {
    setIsCompleted(!isCompleted);
  };

  return (
    <section>
      {/* <h2 className={styles.Subtitle}>{createTitle('current', t)}</h2> */}
      <WeeklyList tasks={tasks} weekDate={weekDates} />
      {nextWeekDates && (
        <>
          <h2 className={styles.Subtitle}>{createTitle('next', t)}</h2>
        </>
      )}
    </section>
  );
};

export default WeeklyTodo;
