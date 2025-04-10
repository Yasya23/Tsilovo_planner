'use client';

import { useTranslations } from 'next-intl';
import IconButton from '@/shared/components/ui/buttons/IconButton';
import styles from './WeekHeader.module.scss';
import icons from '@/shared/icons/icons';

interface WeekHeaderProps {
  title: string;
  isListView: boolean;
  prioritizeTaskDays: boolean;
  onToggleListView: () => void;
  onTogglePrioritizeDays: () => void;
}

export const WeekHeader = ({
  title,
  isListView,
  prioritizeTaskDays,
  onToggleListView,
  onTogglePrioritizeDays,
}: WeekHeaderProps) => {
  const t = useTranslations('Common');

  return (
    <div className={styles.Header}>
      <h2 className={styles.Title}>{title}</h2>
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
