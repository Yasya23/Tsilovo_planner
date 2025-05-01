import { useTranslations } from 'next-intl';

import icons from '@/shared/icons/icons';

import { GoalStats } from '@/features/statistics/types/statistics.type';

import { StatisticsData } from '../statistics-data/StatisticsData';
import styles from './GoalsList.module.scss';

type GoalsListProps = {
  goals: GoalStats[];
};

export const GoalsList = ({ goals }: GoalsListProps) => {
  const t = useTranslations('Common.statistics');

  return (
    <div className={styles.AccordionContent}>
      <ul className={styles.Goals}>
        {goals.map((goal) => (
          <li key={goal.title} className={styles.Goal}>
            <p className={styles.GoalTitle}>
              {goal.emoji} {goal.title}
            </p>
            <StatisticsData
              icon={<icons.CheckCircle />}
              total={goal.completedTasks}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};
