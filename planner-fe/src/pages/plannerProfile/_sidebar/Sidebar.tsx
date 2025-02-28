'use client';

import { usePathname } from 'next/navigation';
import { routes } from '@/shared/constants/routes';
import { FiActivity, FiCalendar, FiSettings } from 'react-icons/fi';
import TeamSwitcher from '@/shared/components/themeToggle/inde';
import LanguageToggle from '@/shared/components/languageToggle';
import LogOut from '@/shared/components/LogOut';
import Avatar from '@/shared/components/ui/avatar';
import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';

import classNames from 'classnames';
import styles from './Sidebar.module.scss';

const menuItems = [
  { labelKey: `planner`, href: routes.planner, icon: <FiCalendar /> },
  { labelKey: 'statistics', href: routes.statistics, icon: <FiActivity /> },
  { labelKey: 'settings', href: routes.settings, icon: <FiSettings /> },
];

export const Sidebar = () => {
  const pathname = usePathname();
  const t = useTranslations('sidebar');

  return (
    <div className={styles.SideBar}>
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
              [styles.Active]: pathname === href,
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
  );
};
