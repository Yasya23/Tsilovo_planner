'use client';

import { useState } from 'react';
import IconButtonCustom from '@/shared/components/ui/buttons/IconButton';
import CheckboxCustom from '@/shared/components/ui/Checkbox';
import icons from '@/shared/icons/icons';
import { useTranslations } from 'next-intl';
import styles from './WeeklyTodo.module.scss';
import { getWeekData, createTitle } from '../../utils/getCurrentWeek';
import WeeklyList from '../weeklyList/WeeklyList';
const tasks = {
  dailyTasks: [
    {
      day: 'Monday',
      tasks: [
        { id: '1', title: 'Complete project proposal', isCompleted: false },
        {
          id: '2',
          title: 'mgkrejgeklrfwff  klekwlqeklrkel jrkjtwelkrlwe orsktoelk',
          isCompleted: true,
        },
        {
          id: '3',
          title: 'mgkrejgeklrfwk lekwlqeklrkel jrkjtwe lkrlwe orktoelk',
          isCompleted: false,
        },
      ],
    },
    {
      day: 'Tuesday',
      tasks: [
        { id: '4', title: 'Update task planner UI', isCompleted: false },
        { id: '5', title: 'Team meeting at 10 AM', isCompleted: true },
        { id: '6', title: 'Fix authentication bug', isCompleted: false },
      ],
    },
    {
      day: 'Wednesday',
      tasks: [
        { id: '7', title: 'Refactor API endpoints', isCompleted: false },
        { id: '8', title: 'Write test cases for backend', isCompleted: true },
        { id: '9', title: 'Plan new feature roadmap', isCompleted: false },
      ],
    },
  ],
};

export const WeeklyTodo = () => {
  const { weekDates, nextWeekDates } = getWeekData();
  console.log(weekDates);
  const t = useTranslations('months');

  const [isCompleted, setIsCompleted] = useState(false);

  const handleCheckboxChange = () => {
    setIsCompleted(!isCompleted);
  };

  return (
    <section>
      <h2 className={styles.Subtitle}>{createTitle('current', t)}</h2>
      <WeeklyList />
      {nextWeekDates && (
        <>
          <h2 className={styles.Subtitle}>{createTitle('next', t)}</h2>
        </>
      )}
    </section>
  );
};

export default WeeklyTodo;
