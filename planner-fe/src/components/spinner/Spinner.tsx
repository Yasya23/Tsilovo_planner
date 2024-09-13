import styles from './spinner.module.scss';

const Spinner = () => (
  <div className={styles.spinner}>
    <div className={styles.circleOne}></div>
    <div className={styles.circleTwo}></div>
    <div className={styles.circleThree}></div>
  </div>
);

export default Spinner;
