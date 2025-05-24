import { useTranslations } from 'next-intl';

import classNames from 'classnames';

import icons from '@/shared/icons/icons';

import { isDateToday } from '@/features/planning/helpers/is-today';

import styles from './DayHeader.module.scss';

type DayHeaderProps = {
  date: string;
  completedTasks: number;
  notCompletedTasks: number;
};
export const DayHeader = ({
  date,
  completedTasks,
  notCompletedTasks,
}: DayHeaderProps) => {
  const t = useTranslations('Common.days');
  const isToday = isDateToday(date);
  return (
    <div
      className={classNames(styles.Header, {
        [styles.Active]: isToday,
      })}
    >
      <h3 className={styles.HeaderTitle}>
        {isToday && <icons.Calendar />}
        {t(`${new Date(date).getDay()}`)}
        <span>{new Date(date).getDate()}</span>
      </h3>
      <div className={styles.Statistic}>
        <span className={styles.Completed}>
          <icons.CheckCircle /> {completedTasks}
        </span>
        <span className={styles.NotCompleted}>
          <icons.Calendar /> {notCompletedTasks}
        </span>
      </div>
    </div>
  );
};

export default DayHeader;
