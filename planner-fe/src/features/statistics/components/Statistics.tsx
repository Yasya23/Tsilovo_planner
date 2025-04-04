import { useStatistic } from '../hooks/use-statistics';
import styles from './Statistics.module.scss';

const Statistics = () => {
  const { statistics } = useStatistic();

  if (!statistics) return <div>No statistic</div>;

  return (
    <div className={styles.Statistics}>
      <section className={styles.Total}></section>
      <section className={styles.Monthly}></section>
    </div>
  );
};

export default Statistics;
