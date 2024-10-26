import Link from 'next/link';
import { routes } from '@/constants/routes';
import { FaRegClock } from 'react-icons/fa';

import styles from './logo.module.scss';

export const Logo = () => {
  return (
    <Link href={routes.home} className={styles.logo}>
      <FaRegClock />
      <span>День</span>Про
    </Link>
  );
};

export default Logo;
