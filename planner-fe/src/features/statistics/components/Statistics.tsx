'use client';

import { useState } from 'react';
import { AccordionUsage } from '@/shared/components/ui/accordion/Accordion';
import icons from '@/shared/icons/icons';
import { StatisticsData } from './ui/statistics-data/StatisticsData';
import { MonthlyStatsHeader } from './ui/montly-states-header/MonthlyStatsHeader';
import { GoalsList } from './ui/goals-list/GoalsList';
import styles from './Statistics.module.scss';
import { useTranslations } from 'next-intl';
import { useStatistics } from '../hooks/use-statistics';
import { ErrorMessage } from './ui/error-message/Error';
import { SelectYear } from './ui/SelectYear';
import { Skeleton } from './ui/skeleton/Skeleton';

const currentYear = new Date().getFullYear().toString();
export const Statistics = () => {
  const [selectedYear, setSelectedYear] = useState<string | null>(null);

  const {
    data: statistics,
    isLoading,
    isError,
  } = useStatistics(selectedYear ?? currentYear);

  const t = useTranslations('Common');

  if (isLoading) return <Skeleton />;

  if (isError || !statistics)
    return <ErrorMessage error={t('statistics.error')} />;

  return (
    <div className={styles.Statistics}>
      <h1 className={styles.Title}>{t('statistics.annualStatistics')}</h1>
      <div className={styles.Year}>
        <p>Year: </p>
        <SelectYear
          availableYears={statistics.availableYears}
          currentYear={statistics.year}
          onChange={(year) => {
            setSelectedYear(year);
          }}
        />
      </div>

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
    </div>
  );
};

export default Statistics;
