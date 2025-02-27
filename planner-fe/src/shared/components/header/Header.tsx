'use client';

import Link from 'next/link';
import Logo from '../ui/logo/Logo';
import ButtonCustom from '../ui/buttons/Button';
import { routes } from '@/shared/constants/routes';
import LogOut from '@/shared/components/LogOut';
import { useAuthStore } from '@/shared/store';
import { usePathname } from 'next/navigation';

import styles from './Header.module.scss';

export const Header = () => {
  const isAuth = useAuthStore((state) => state.userAuth);
  const pathname = usePathname();
  const isHomePage = pathname === routes.home;

  return (
    <header className={styles.Header}>
      <Logo />
      {isAuth && (
        <div className={styles.Menu}>
          <Link href="/planner" className={styles.Link}>
            Планувальник
          </Link>
          <LogOut />
        </div>
      )}
      {isHomePage && <ButtonCustom href={routes.login} name="Sign In" />}
    </header>
  );
};

export default Header;
