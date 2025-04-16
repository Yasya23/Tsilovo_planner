'use client';

import { useEffect, useState } from 'react';

import { useLocale } from 'next-intl';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';

import { Link } from '@/i18n/navigation';
import classNames from 'classnames';

import LogOut from '@/shared/components/LogOut';
import Avatar from '@/shared/components/ui/avatar/Avatar';
import IconButtonCustom from '@/shared/components/ui/buttons/IconButton';
import LanguageToggle from '@/shared/components/ui/LanguageSwitch';
import TeamSwitcher from '@/shared/components/ui/themeToggle/ThemeToggle';
import { routes } from '@/shared/constants/routes';
import useWidthThreshold from '@/shared/hooks/useWidthThreshold';
import icons from '@/shared/icons/icons';

import { useAuthContext } from '@/features/auth/context/AuthProvider';

import styles from './Sidebar.module.scss';

const menuItems = [
  {
    labelKey: `sidebar.planner`,
    href: routes.planner,
    icon: <icons.Calendar />,
  },
  {
    labelKey: 'sidebar.statistics',
    href: routes.statistics,
    icon: <icons.Activity />,
  },
  {
    labelKey: 'sidebar.settings',
    href: routes.settings,
    icon: <icons.Settings />,
  },
  { labelKey: 'sidebar.help', href: routes.help, icon: <icons.Help /> },
];

export const Sidebar = () => {
  const isPastThreshold = useWidthThreshold(768);
  const t = useTranslations('Common');
  const { user } = useAuthContext();
  console.log(user);
  const [isMenuOpen, setIsMenuOpen] = useState(true);

  const currentLang = useLocale();
  const pathname = usePathname();

  useEffect(() => {
    setIsMenuOpen(isPastThreshold);
  }, [isPastThreshold]);

  return (
    <div
      className={classNames(styles.SideBar, {
        [styles.Open]: isMenuOpen,
      })}
    >
      <div className={styles.Header}>
        {!isMenuOpen ? (
          <div className={styles.MobileMenuIcon}>
            <IconButtonCustom
              icon={<icons.AlignJustify />}
              name={t('buttons.openMenu')}
              size="small"
              onClick={() => setIsMenuOpen(true)}
            />
          </div>
        ) : (
          <>
            <div className={styles.UserInfo}>
              <Avatar name={user?.name} imageUrl={user?.image} />

              {isMenuOpen && <h2>{user?.name}</h2>}
              <LogOut />
            </div>

            <IconButtonCustom
              icon={<icons.FiChevronsLeft />}
              name={t('buttons.close')}
              size="medium"
              onClick={() => setIsMenuOpen(false)}
            />
          </>
        )}
      </div>

      <div className={styles.Menu}>
        {menuItems.map(({ labelKey, href, icon }) => {
          const title = t(labelKey);
          return (
            <Link
              key={href}
              href={href}
              className={classNames(styles.Link, {
                [styles.Active]: pathname === `/${currentLang}${href}`,
              })}
            >
              {icon} {isMenuOpen && title}
            </Link>
          );
        })}
      </div>
      {isMenuOpen && (
        <div className={styles.GlobalSettings}>
          <LanguageToggle />
          <TeamSwitcher />
        </div>
      )}
    </div>
  );
};
