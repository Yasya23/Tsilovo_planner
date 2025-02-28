'use client';

import { usePathname } from 'next/navigation';
import { routes } from '@/shared/constants/routes';
import { FiActivity, FiCalendar, FiSettings } from 'react-icons/fi';
import TeamSwitcher from '@/shared/components/themeToggle/inde';
import LanguageToggle from '@/shared/components/languageToggle';
import LogOut from '@/shared/components/LogOut';
import Avatar from '@/shared/components/ui/avatar';
import { Link } from '@/i18n/navigation';

import classNames from 'classnames';
import styles from './Sidebar.module.scss';

const menuItems = [
  { label: 'Планувальник', href: routes.planner, icon: <FiCalendar /> },
  { label: 'Статистика', href: routes.statistics, icon: <FiActivity /> },
  { label: 'Налаштування', href: routes.settings, icon: <FiSettings /> },
];

export const Sidebar = () => {
  const pathname = usePathname();

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
        {menuItems.map(({ label, href, icon }) => (
          <Link
            key={href}
            href={href}
            className={classNames(styles.Link, {
              [styles.Active]: pathname === href,
            })}>
            {icon} {label}
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
