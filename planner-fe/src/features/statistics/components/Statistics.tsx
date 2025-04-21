'use client';

import { useState } from 'react';

import { useTranslations } from 'next-intl';

import { AccordionUsage } from '@/shared/components/ui/accordion/Accordion';
import icons from '@/shared/icons/icons';

import { useStatistics } from '../hooks/use-statistics';
import { ErrorMessage } from './_parts/error-message/Error';
import { GoalsList } from './_parts/goals-list/GoalsList';
import { MonthlyStatsHeader } from './_parts/montly-states-header/MonthlyStatsHeader';
import { SelectYear } from './_parts/SelectYear';
import { Skeleton } from './_parts/skeleton/Skeleton';
import { StatisticsData } from './_parts/statistics-data/StatisticsData';
import styles from './Statistics.module.scss';

const currentYear = new Date().getFullYear().toString();
export const Statistics = () => {
  const [selectedYear, setSelectedYear] = useState(currentYear);

  const { data: statistics, isPending, isError } = useStatistics(selectedYear);

  const t = useTranslations('Common');

  if (isPending) return <Skeleton />;

  return (
    <div className={styles.Statistics}>
      <h1 className={styles.Title}>{t('statistics.annualStatistics')}</h1>
      <p className={styles.Notification}>{t('statistics.notification')}</p>
      {isError || !statistics?.monthlyStats ? (
        <ErrorMessage error={t('statistics.error')} />
      ) : (
        <>
          <SelectYear
            availableYears={statistics.availableYears}
            currentYear={statistics.year}
            onChange={(year) => setSelectedYear(year)}
          />

          <div className={styles.Total}>
            <StatisticsData
              icon={<icons.Award />}
              title={t('statistics.totalGoals')}
              total={statistics.totalGoals}
            />
            <StatisticsData
              icon={<icons.CheckCircle />}
              title={t('statistics.completedTasks')}
              total={statistics.totalCompleted}
            />
          </div>

          <section className={styles.Monthly}>
            <div className={styles.MonthlyContent}>
              <h2 className={styles.SubTitle}>
                {t('statistics.monthlyStatistics')}
              </h2>
              <AccordionUsage
                items={statistics.monthlyStats.map((item) => ({
                  title: (
                    <MonthlyStatsHeader
                      month={item.month}
                      totalGoals={item.totalGoals}
                      totalCompleted={item.totalCompleted}
                    />
                  ),
                  description: <GoalsList goals={item.goals} />,
                }))}
              />
            </div>
          </section>
        </>
      )}
    </div>
  );
};

export default Statistics;
