import { useTranslations } from 'next-intl';

import { AccordionUsage } from '@/shared/components/accordion/Accordion';
import icons from '@/shared/icons/icons';

import { TasksList } from '@/features/statistics/components/tasks-list/TasksList';
import { GoalStats } from '@/features/statistics/types/statistics.type';

import { StatisticsData } from '../statistics-data/StatisticsData';
import styles from './GoalsList.module.scss';

type GoalsListProps = {
  goals: GoalStats[];
};
export const GoalsList = ({ goals }: GoalsListProps) => {
  return (
    <div className={styles.AccordionContent}>
      <AccordionUsage
        items={goals.map((goal) => ({
          title: (
            <h3 key={goal.title} className={styles.Goal}>
              <p className={styles.GoalTitle}>
                {goal.emoji} {goal.title}
              </p>
              <StatisticsData
                icon={<icons.CheckCircle />}
                total={goal.completedTasks}
              />
            </h3>
          ),
          description: <TasksList tasks={goal.tasks} />,
        }))}
      />
    </div>
  );
};
