'use client';

import Link from 'next/link';
import Logo from '../ui/logo/Logo';
import ButtonCustom from '../ui/buttons/Button';
import { routes } from '@/shared/constants/routes';
import LogOut from '@/shared/components/LogOut';
import { useAuthStore } from '@/shared/store';
import { usePathname } from 'next/navigation';
import useScrollThreshold from '@/shared/hooks/useScrollThreshold';
import classNames from 'classnames';

import styles from './Header.module.scss';

export const Header = () => {
  const isSticky = useScrollThreshold(100);

  const isAuth = useAuthStore((state) => state.userAuth);
  const pathname = usePathname();
  const isHomePage = pathname === routes.home;

  return (
    <header
      className={classNames(styles.Header, { [styles.Sticky]: isSticky })}>
      <div className={styles.Wrapper}>
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
      </div>
    </header>
  );
};

export default Header;
