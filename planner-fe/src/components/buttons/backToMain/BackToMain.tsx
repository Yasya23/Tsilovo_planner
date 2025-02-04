import Link from 'next/link';
import { routes } from '@/constants/routes';

import styles from './button.module.scss';

export const BackToMain = ({ message }: { message: string }) => {
  return (
    <div className={styles.wrapper}>
      <p>{message}</p>
      <Link href={routes.home} className={styles.buttonToMain}>
        Повернутись на головну
      </Link>
      <Link href={routes.planner} className={styles.buttonToPlanner}>
        До планувальника
      </Link>
    </div>
  );
};

export default BackToMain;
