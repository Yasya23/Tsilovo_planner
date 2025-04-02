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
import useWidthThreshold from '@/shared/hooks/useWidthThreshold';
import classNames from 'classnames';
import styles from './index.module.scss';

const menuItems = [
  { labelKey: `planner`, href: routes.planner, icon: <icons.Calendar /> },
  { labelKey: 'statistics', href: routes.statistics, icon: <icons.Activity /> },
  { labelKey: 'settings', href: routes.settings, icon: <icons.Settings /> },
  { labelKey: 'help', href: routes.help, icon: <icons.Help /> },
];

export const Sidebar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isPastThreshold = useWidthThreshold(765);
  const currentLang = useLocale();

  const pathname = usePathname();
  const t = useTranslations('Common.sidebar');

  if (isPastThreshold && isMenuOpen) setIsMenuOpen(false);

  return (
    <>
      <div className={styles.MobileMenuIcon}>
        {isMenuOpen ? (
          <IconButtonCustom
            icon={<icons.X />}
            name="Close menu"
            size="large"
            onClick={() => {
              setIsMenuOpen(false);
            }}
          />
        ) : (
          <IconButtonCustom
            icon={<icons.AlignJustify />}
            name="Open menu"
            size="large"
            onClick={() => {
              setIsMenuOpen(true);
            }}
          />
        )}
      </div>
      <div
        className={classNames(styles.SideBar, {
          [styles.Open]: isMenuOpen,
        })}>
        <div className={styles.Header}>
          <div className={styles.UserInfo}>
            <Avatar name="Yana" />
            <h2>Yana</h2>
          </div>
          <LogOut />
        </div>
        <div className={styles.Menu}>
          {menuItems.map(({ labelKey, href, icon }) => (
            <Link
              key={href}
              href={href}
              className={classNames(styles.Link, {
                [styles.Active]: pathname === `/${currentLang}${href}`,
              })}>
              {icon} {t(labelKey)}
            </Link>
          ))}
        </div>
        <div className={styles.GlobalSettings}>
          <LanguageToggle />
          <TeamSwitcher />
        </div>
      </div>
    </>
  );
};
