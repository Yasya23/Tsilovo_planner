'use client';

import { ActiveGoal } from '@/features/planning/types/goals.type';
import { WeeklyTasks } from '@/features/planning/types/task.type';
import { DaySection } from '@/features/planning/components/_parts/day-section/DaySection';
import styles from './WeeklyList.module.scss';
import classNames from 'classnames';

interface WeeklyListProps {
  tasks: WeeklyTasks;
  activeGoals: ActiveGoal[];
  isListView: boolean;
}

export const WeeklyList = ({
  tasks = [],
  activeGoals = [],
  isListView = false,
}: WeeklyListProps) => {
  return (
    <div className={classNames(styles.Day, { [styles.listView]: isListView })}>
      {tasks.map(({ date, tasks: dayTasks }) => (
        <DaySection
          key={date}
          date={date}
          dayTasks={dayTasks}
          activeGoals={activeGoals}
        />
      ))}
    </div>
  );
};
