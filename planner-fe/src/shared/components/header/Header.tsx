'use client';

import Logo from '../ui/logo/Logo';
import ButtonCustom from '../ui/buttons/Button';
import { routes } from '@/shared/constants/routes';
import icons from '@/shared/icons/icons';
import LogOut from '@/shared/components/LogOut';
import { useAuthStore } from '@/shared/store';
import { usePathname } from 'next/navigation';
import useScrollThreshold from '@/shared/hooks/useScrollThreshold';
import { isCurrentRoute } from '@/shared/utils/isCurrentRoute';
import { useTranslations } from 'next-intl';

import styles from './Header.module.scss';
import classNames from 'classnames';

export const Header = () => {
  const isSticky = useScrollThreshold(100);
  const t = useTranslations('buttons');

  const isAuth = useAuthStore((state) => state.userAuth);
  const pathname = usePathname();
  const isHomePage = isCurrentRoute(pathname, routes.home);

  return (
    <header
      className={classNames(styles.Header, { [styles.Sticky]: isSticky })}>
      <div className={styles.Wrapper}>
        <Logo />
        {isAuth ? (
          <div className={styles.Menu}>
            <ButtonCustom
              href={routes.planner}
              name={t('profile')}
              style="outlined"
              iconStart={<icons.User />}
            />
            <LogOut />
          </div>
        ) : (
          isHomePage && <ButtonCustom href={routes.login} name={t('login')} />
        )}
      </div>
    </header>
  );
};

export default Header;
