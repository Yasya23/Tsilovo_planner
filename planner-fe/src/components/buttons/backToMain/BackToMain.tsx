'use client';

import Link from 'next/link';
import { routes } from '@/constants/routes';

import styles from './button.module.scss';

export const BackToMain = ({ message }: { message: string }) => {
  return (
    <div className={styles.button}>
      <p>{message}</p>
      <Link href={routes.home} className={styles.withBackground}>
        Повернутись на головну
      </Link>
      <Link href={routes.planner} className={styles.outlineBorder}>
        До планувальника
      </Link>
    </div>
  );
};

export default BackToMain;
