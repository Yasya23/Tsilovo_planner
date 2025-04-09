'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { routes } from '@/shared/constants/routes';
import { useLocale } from 'next-intl';

import icons from '@/shared/icons/icons';
import TeamSwitcher from '@/shared/components/ui/themeToggle/ThemeToggle';
import LanguageToggle from '@/shared/components/ui/LanguageSwitch';
import LogOut from '@/shared/components/LogOut';
import Avatar from '@/shared/components/ui/avatar/Avatar';
import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import IconButtonCustom from '@/shared/components/ui/buttons/IconButton';

import classNames from 'classnames';
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
  const isPastThreshold = window.innerWidth > 768;
  const t = useTranslations('Common');

  const [isMenuOpen, setIsMenuOpen] = useState(isPastThreshold);

  const currentLang = useLocale();

  const pathname = usePathname();

  return (
    <div
      className={classNames(styles.SideBar, {
        [styles.Open]: isMenuOpen,
      })}>
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
              <Avatar name="Yana" />
              {isMenuOpen && <h2>Yana</h2>}
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
              })}>
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
