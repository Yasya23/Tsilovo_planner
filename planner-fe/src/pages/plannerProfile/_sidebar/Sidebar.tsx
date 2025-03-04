'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { routes } from '@/shared/constants/routes';
import { useLocale } from 'next-intl';
import {
  FiActivity,
  FiCalendar,
  FiSettings,
  FiX,
  FiAlignJustify,
} from 'react-icons/fi';
import TeamSwitcher from '@/shared/components/themeToggle';
import LanguageToggle from '@/shared/components/languageToggle';
import LogOut from '@/shared/components/LogOut';
import Avatar from '@/shared/components/ui/avatar';
import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import IconButtonCustom from '@/shared/components/ui/buttons/IconButton';
import useWidthThreshold from '@/shared/hooks/useWidthThreshold';
import classNames from 'classnames';
import styles from './Sidebar.module.scss';

const menuItems = [
  { labelKey: `planner`, href: routes.planner, icon: <FiCalendar /> },
  { labelKey: 'statistics', href: routes.statistics, icon: <FiActivity /> },
  { labelKey: 'settings', href: routes.settings, icon: <FiSettings /> },
];

export const Sidebar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isPastThreshold = useWidthThreshold(765);
  const currentLang = useLocale();
  console.log(currentLang);
  const pathname = usePathname();
  const t = useTranslations('sidebar');
  console.log(pathname);
  useEffect(() => {
    if (isPastThreshold) setIsMenuOpen(false);
  }, [isPastThreshold]);

  return (
    <>
      <div className={styles.MobileMenuIcon}>
        {isMenuOpen ? (
          <IconButtonCustom
            icon={<FiX />}
            name="Close menu"
            size="large"
            onClick={() => {
              setIsMenuOpen(false);
            }}
          />
        ) : (
          <IconButtonCustom
            icon={<FiAlignJustify />}
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
