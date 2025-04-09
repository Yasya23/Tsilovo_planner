'use client';

import { useState, useEffect } from 'react';
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
import useWidthThreshold from '@/shared/hooks/useWidthThreshold';
import classNames from 'classnames';
import styles from './Sidebar.module.scss';

const menuItems = [
  { labelKey: `planner`, href: routes.planner, icon: <icons.Calendar /> },
  { labelKey: 'statistics', href: routes.statistics, icon: <icons.Activity /> },
  { labelKey: 'settings', href: routes.settings, icon: <icons.Settings /> },
  { labelKey: 'help', href: routes.help, icon: <icons.Help /> },
];

const isPastThreshold = window.innerWidth > 768;

export const Sidebar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(isPastThreshold);

  const currentLang = useLocale();

  const pathname = usePathname();
  const t = useTranslations('Common.sidebar');

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
              name="Open menu"
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
              name="close"
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
