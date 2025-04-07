import { useStatistic } from '../hooks/use-statistics';
import { AccordionUsage } from '@/shared/components/ui/accordion/Accordion';
import icons from '@/shared/icons/icons';
import { StatisticsData } from './ui/statistics-data/StatisticsData';
import { MonthlyStatsHeader } from './ui/montly-states-header/MonthlyStatsHeader';
import { GoalsList } from './ui/goals-list/GoalsList';
import styles from './Statistics.module.scss';
import { useTranslations } from 'next-intl';

export const Statistics = () => {
  const { statistics } = useStatistic();
  const t = useTranslations('Common');

  if (!statistics) return <div>{t('statistics.error')}</div>;

  const renderMonthlyStats = (item) => ({
    title: (
      <>
        <h3>{t(`months.${item.month}`)}</h3>
        <StatisticsData
          icon={<icons.Idea />}
          title={t('statistics.totalGoals')}
          total={item.totalGoals}
        />
        <StatisticsData
          icon={<icons.ToDo />}
          title={t('statistics.completedTasks')}
          total={item.totalCompleted}
        />
      </>
    ),
    description: (
      <div className={styles.AccordionContent}>
        <div className={styles.Goals}>
          {item.goals.map((goal) => (
            <div key={goal.title} className={styles.Goal}>
              <span>{goal.title}</span>
              <span>
                {t('statistics.completedTasks')}: {goal.completedTasks}
              </span>
            </div>
          ))}
        </div>
      </div>
    ),
  });

  return (
    <div className={styles.Statistics}>
      <section className={styles.Total}>
        <h1 className={styles.Title}>
          {t('statistics.annualStatistics')} {statistics.year}
        </h1>
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
      </section>

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
