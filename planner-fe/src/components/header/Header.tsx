import Link from 'next/link';
import Logo from '../logo/Logo';
import ButtonCustom from '../buttons/Button';
import { routes } from '@/constants/routes';
import LogOut from '@/components/buttons/LogOut';
import { useAuthStore } from '@/store';

import styles from './Header.module.scss';

export const Header = () => {
  const isAuth = useAuthStore((state) => state.userAuth);

  return (
    <header className={styles.Header}>
      <Logo />
      {isAuth ? (
        <div className={styles.Menu}>
          <Link href="/planner" className={styles.Link}>
            Планувальник
          </Link>
          <LogOut />
        </div>
      ) : (
        <ButtonCustom href={routes.login} name="Sign In" />
      )}
    </header>
  );
};
