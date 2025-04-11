'use client';

import { useTranslations } from 'next-intl';
import IconButton from '@/shared/components/ui/buttons/IconButton';
import { createTitle } from '@/features/planning/helpers/create-week-title';
import styles from './WeekHeader.module.scss';
import icons from '@/shared/icons/icons';
import { WeeklyTasks } from '@/features/planning/types/task.type';
interface WeekHeaderProps {
  week: WeeklyTasks;
  isListView: boolean;
  prioritizeTaskDays: boolean;
  onToggleListView: () => void;
  onTogglePrioritizeDays: () => void;
}

export const WeekHeader = ({
  week,
  isListView,
  prioritizeTaskDays,
  onToggleListView,
  onTogglePrioritizeDays,
}: WeekHeaderProps) => {
  const t = useTranslations('Common');

  return (
    <div className={styles.Header}>
      <h2 className={styles.Title}>
        {createTitle(week, useTranslations('Common'))}
      </h2>
      <ul className={styles.FilterList}>
        <li className={isListView ? styles.Active : ''}>
          <IconButton
            icon={<icons.List />}
            name={t('buttons.list')}
            onClick={onToggleListView}
          />
        </li>
        <li className={prioritizeTaskDays ? styles.Active : ''}>
          <IconButton
            icon={<icons.Sunrise />}
            name={t('buttons.daysWithTasksFirst')}
            onClick={onTogglePrioritizeDays}
          />
        </li>
      </ul>
    </div>
  );
};
