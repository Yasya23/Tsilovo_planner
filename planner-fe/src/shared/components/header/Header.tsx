'use client';

import Link from 'next/link';
import Logo from '../ui/logo/Logo';
import ButtonCustom from '../ui/buttons/Button';
import { routes } from '@/shared/constants/routes';
import LogOut from '@/shared/components/ui/buttons/LogOut';
import { useAuthStore } from '@/shared/store';

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

export default Header;
