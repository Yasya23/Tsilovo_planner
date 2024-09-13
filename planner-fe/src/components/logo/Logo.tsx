import Link from 'next/link';
import styles from './logo.module.scss';
import { routes } from '@/constants/routes';
import { FaRegClock } from 'react-icons/fa';

const Logo = () => {
  return (
    <Link href={routes.home} className={styles.logo}>
      <FaRegClock />
      <span>День</span>Про
    </Link>
  );
};

export default Logo;
