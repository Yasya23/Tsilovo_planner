'use client';

import styles from './button.module.scss';
import Link from 'next/link';
import { routes } from '@/constants/routes';
import { useAuthStore } from '@/store/Store';

export const BackToMain = ({ message }: { message: string }) => {
  const user = useAuthStore((state) => state.userAuth);
  return (
    <div className={styles.button}>
      <p>{message}</p>
      <Link
        href={user ? routes.profile : routes.home}
        className={styles.buttonStyle}>
        Повернутись на головну
      </Link>
    </div>
  );
};

export default BackToMain;
