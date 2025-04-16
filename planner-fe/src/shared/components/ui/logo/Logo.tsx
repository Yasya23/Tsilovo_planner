import Link from 'next/link';

import { routes } from '@/shared/constants/routes';

import styles from './Logo.module.scss';

export const Logo = () => {
  return (
    <Link href={routes.home} className={styles.Logo} aria-label="logo">
      Tempo
    </Link>
  );
};

export default Logo;
