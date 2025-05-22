'use client';

import { useTranslations } from 'next-intl';

import classNames from 'classnames';

import icons from '@/shared/icons/icons';

import styles from './WeeklyStatistic.module.scss';

type WeeklyStatisticProps = {
  statistics: { completedTasks: number; notCompletedTasks: number };
};

export const WeeklyStatistic = ({
  statistics: { completedTasks, notCompletedTasks },
}: WeeklyStatisticProps) => {
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
          <span>{completedTasks ?? '-'}</span>
        </p>
        <p className={styles.SubTitle}>
          <span>
            <icons.Calendar /> {t('todo')}
          </span>
          <span>{notCompletedTasks ?? '-'}</span>
        </p>
      </div>
    </div>
  );
};
