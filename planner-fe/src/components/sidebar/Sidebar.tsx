'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useAuthStore } from '@/store';
import { routes } from '@/constants/routes';
import { FiActivity, FiCalendar } from 'react-icons/fi';

import classNames from 'classnames';
import styles from './Sidebar.module.scss';

const menuItems = [
  { label: 'Планувальник', href: routes.planner, icon: <FiCalendar /> },
  { label: 'Статистика', href: routes.statistics, icon: <FiActivity /> },
];

export const Sidebar = () => {
  const pathname = usePathname();

  return (
    <div className={styles.sideBar}>
      <div className={styles.menu}>
        {menuItems.map(({ label, href, icon }) => (
          <Link
            key={href}
            href={href}
            className={classNames(styles.menuLink, {
              [styles.active]: pathname === href,
            })}>
            {icon} {label}
          </Link>
        ))}
      </div>
    </div>
  );
};
