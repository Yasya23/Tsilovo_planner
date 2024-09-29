import Link from 'next/link';
import { useAuthStore } from '@/store/AuthStore';
import { routes } from '@/constants/routes';
import { FaRegClock } from 'react-icons/fa';
import styles from './logo.module.scss';

const Logo = () => {
  const user = useAuthStore((state) => state.userAuth);

  return (
    <Link href={user ? routes.profile : routes.home} className={styles.logo}>
      <FaRegClock />
      <span>День</span>Про
    </Link>
  );
};

export default Logo;
