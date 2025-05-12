'use client';

import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';

import classNames from 'classnames';

import LogOut from '@/shared/components/LogOut';
import { routes } from '@/shared/constants/routes';
import { useScrollThreshold } from '@/shared/hooks/useScrollThreshold';
import icons from '@/shared/icons/icons';
import { isCurrentRoute } from '@/shared/utils/check-current-route';

import { useAuth } from '@/features/auth/hooks/useAuth';

import { ButtonCustom } from '../buttons/Button';
import Logo from '../logo/Logo';
import styles from './Header.module.scss';

export const Header = () => {
  const isSticky = useScrollThreshold(150);
  const t = useTranslations('Common.buttons');
  const { user } = useAuth();
  const pathname = usePathname();
  const isHomePage = isCurrentRoute(pathname, routes.home);

  return (
    <header
      className={classNames(styles.Header, { [styles.Sticky]: isSticky })}
    >
      <div className={styles.Wrapper}>
        <Logo />
        {user?.id ? (
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
