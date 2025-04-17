'use client';

import { useTranslations } from 'next-intl';

import classNames from 'classnames';

import icons from '@/shared/icons/icons';

import { WeeklyStatistics } from '@/features/planning/types/goals.type';

import styles from './WeeklyStatistic.module.scss';

type WeeklyStatisticProps = {
  statistics: WeeklyStatistics | null;
  isPending: boolean;
  isError: boolean;
};

export const WeeklyStatistic = ({ statistics }: WeeklyStatisticProps) => {
  const t = useTranslations('Common.statistics');

  return (
    <div className={styles.Statistic}>
      <div className={styles.Wrapper}>
        <h2 className={styles.Title}>{t('weeklyStatistics')}</h2>

        <p className={classNames(styles.SubTitle, styles.Completed)}>
          <span>
            <icons.CheckCircle />
            {t('completed')}
          </span>
          <span>{statistics?.completedTasks ?? '-'}</span>
        </p>
        <p className={styles.SubTitle}>
          <span>
            <icons.Calendar /> {t('todo')}
          </span>
          <span>{statistics?.notCompletedTasks ?? '-'}</span>
        </p>
      </div>
    </div>
  );
};
