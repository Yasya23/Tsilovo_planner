'use client';

import { usePathname } from 'next/navigation';
import { routes } from '@/constants/routes';
import Link from 'next/link';

import { FiSettings, FiActivity, FiCalendar } from 'react-icons/fi';
import { GoGoal } from 'react-icons/go';

import styles from './sidebar.module.scss';
import classNames from 'classnames';

const menuItems = [
  { label: 'Планувальник', href: routes.profile, icon: <FiCalendar /> },
  { label: 'Цілі', href: routes.goals, icon: <GoGoal /> },
  { label: 'Статистика', href: routes.statistics, icon: <FiActivity /> },
  { label: 'Налаштування', href: routes.settings, icon: <FiSettings /> },
];

export const Sidebar = () => {
  const pathname = usePathname();

  return (
    <div className={styles.sideBar}>
      {menuItems.map(({ label, href, icon }) => (
        <Link
          key={href}
          href={href}
          className={classNames(
            {
              [styles.active]: pathname === href,
            },
            styles.withIcon
          )}>
          {icon} {label}
        </Link>
      ))}
    </div>
  );
};

export default Sidebar;
