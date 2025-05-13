'use client';

import { useTranslations } from 'next-intl';

import { IconButtonCustom } from '@/shared/components/buttons/IconButton';
import icons from '@/shared/icons/icons';

import { createTitle } from '@/features/planning/helpers/create-week-title';
import { WeeklyTasks } from '@/features/planning/types/task.type';

import styles from './WeekHeader.module.scss';

interface WeekHeaderProps {
  week: WeeklyTasks;
  isListView: boolean;
  prioritizeTaskDays: boolean;
  isTodayView: boolean;
  onToggleListView: () => void;
  onTogglePrioritizeDays: () => void;
  onToggleIsTodayView: () => void;
}

export const WeekHeader = ({
  week,
  isListView,
  prioritizeTaskDays,
  isTodayView,
  onToggleListView,
  onTogglePrioritizeDays,
  onToggleIsTodayView,
}: WeekHeaderProps) => {
  const t = useTranslations('Common');

  return (
    <div className={styles.Header}>
      <h2 className={styles.Title}>
        {createTitle(week, useTranslations('Common'))}
      </h2>
      <ul className={styles.FilterList}>
        <li className={isListView ? styles.Active : ''}>
          <IconButtonCustom
            icon={<icons.List />}
            name={t('buttons.list')}
            onClick={onToggleListView}
            disabled={isTodayView}
          />
        </li>
        <li className={prioritizeTaskDays ? styles.Active : ''}>
          <IconButtonCustom
            icon={<icons.Sunrise />}
            name={t('buttons.daysWithTasksFirst')}
            onClick={onTogglePrioritizeDays}
            disabled={isTodayView}
          />
        </li>
        <li className={isTodayView ? styles.Active : ''}>
          <IconButtonCustom
            icon={<icons.Calendar />}
            name={t('buttons.todayTasks')}
            onClick={onToggleIsTodayView}
          />
        </li>
      </ul>
    </div>
  );
};
