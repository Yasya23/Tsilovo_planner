import Link from 'next/link';
import styles from './logo.module.scss';
import { routes } from '@/constants/routes';

const Logo = () => {
  return (
    <Link href={routes.home} className={styles.logo}>
      CINEMA
    </Link>
  );
};

export default Logo;
