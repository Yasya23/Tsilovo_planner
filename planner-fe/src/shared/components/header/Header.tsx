'use client';

import Logo from '../ui/logo/Logo';
import ButtonCustom from '../ui/buttons/Button';
import { routes } from '@/shared/constants/routes';
import icons from '@/shared/icons/icons';
import LogOut from '@/shared/components/LogOut';
import { usePathname } from 'next/navigation';
import useScrollThreshold from '@/shared/hooks/useScrollThreshold';
import { isCurrentRoute } from '@/shared/utils/check-current-route';
import { useTranslations } from 'next-intl';

import styles from './Header.module.scss';
import classNames from 'classnames';
import { useAuth } from '@/features/auth/hooks/useAuth';

export const Header = () => {
  const isSticky = useScrollThreshold(100);
  const t = useTranslations('Common.buttons');
  const { user } = useAuth();

  const pathname = usePathname();
  const isHomePage = isCurrentRoute(pathname, routes.home);

  return (
    <header
      className={classNames(styles.Header, { [styles.Sticky]: isSticky })}>
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
