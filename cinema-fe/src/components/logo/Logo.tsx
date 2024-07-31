import Link from 'next/link';
import styles from './logo.module.scss';

const Logo = () => {
  return (
    <Link href="/" className={styles.logo}>
      CINEMA
    </Link>
  );
};

export default Logo;
