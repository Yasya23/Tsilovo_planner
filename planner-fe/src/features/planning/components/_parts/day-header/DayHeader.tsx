import classNames from 'classnames';
import { useTranslations } from 'next-intl';
import styles from './DayHeader.module.scss';

type DayHeaderProps = {
  date: string;
};
export const DayHeader = ({ date }: DayHeaderProps) => {
  const t = useTranslations('Common.days');

  const today = new Date().getDate();

  return (
    <div className={styles.Header}>
      <h3
        className={classNames(styles.HeaderTitle, {
          [styles.Active]: new Date(date).getDate() === today,
        })}>
        {t(`${new Date(date).getDay()}`)}{' '}
        <span>{new Date(date).getDate()}</span>
      </h3>
    </div>
  );
};

export default DayHeader;
