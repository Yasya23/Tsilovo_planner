import { useTranslations } from 'next-intl';
import styles from './GoalsList.module.scss';
export const GoalsList = ({ goals }) => {
  const t = useTranslations('Common.statistics');

  return (
    <div className={styles.AccordionContent}>
      <div className={styles.Goals}>
        {goals.map((goal) => (
          <div key={goal.title} className={styles.Goal}>
            <span>{goal.title}</span>
            <span>
              {t('completedTasks')}: {goal.completedTasks}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
