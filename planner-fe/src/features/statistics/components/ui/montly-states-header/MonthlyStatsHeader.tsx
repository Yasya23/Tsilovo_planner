import { StatisticsData } from '@/features/statistics/components/ui/statistics-data/StatisticsData';
import icons from '@/shared/icons/icons';
import { useTranslations } from 'next-intl';
import styles from './MonthlyStatsHeader.module.scss';

type MonthlyStateProps = {
  month: number;
  totalGoals: number;
  totalCompleted: number;
};
export const MonthlyStatsHeader = ({
  month,
  totalGoals,
  totalCompleted,
}: MonthlyStateProps) => {
  const t = useTranslations('Common');

  return (
    <div className={styles.Header}>
      <h3 className={styles.Title}>{t(`months.${month}`)}</h3>
      <div className={styles.Statistics}>
        <StatisticsData
          icon={<icons.Award />}
          title={t('statistics.goals')}
          total={totalGoals}
          hideTitleOnMobile={true}
        />
        <StatisticsData
          icon={<icons.CheckCircle />}
          title={t('statistics.completedTasks')}
          total={totalCompleted}
          hideTitleOnMobile={true}
        />
      </div>
    </div>
  );
};
