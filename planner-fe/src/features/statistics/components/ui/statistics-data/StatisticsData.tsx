import { ReactNode } from 'react';
import classNames from 'classnames';
import styles from './StatisticsData.module.scss';

type StatisticsDataProps = {
  icon: ReactNode;
  title?: string;
  total: number;
  hideTitleOnMobile?: boolean;
};
export const StatisticsData = ({
  icon,
  title,
  total,
  hideTitleOnMobile = false,
}: StatisticsDataProps) => {
  return (
    <p className={styles.Data}>
      {icon}
      {title && (
        <span
          className={classNames(styles.Title, {
            [styles.HideTitle]: hideTitleOnMobile,
          })}>
          {title}:
        </span>
      )}
      <span className={styles.Total}>{total}</span>
    </p>
  );
};
