'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useAuthStore } from '@/store';
import { routes } from '@/constants/routes';
import { FiActivity, FiCalendar } from 'react-icons/fi';
import Logo from '@/components/logo/Logo';
import classNames from 'classnames';
import styles from './Sidebar.module.scss';

const menuItems = [
  { label: 'Планувальник', href: routes.planner, icon: <FiCalendar /> },
  { label: 'Статистика', href: routes.statistics, icon: <FiActivity /> },
];

export const Sidebar = () => {
  const pathname = usePathname();

  return (
    <div className={styles.SideBar}>
      <Logo />
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
    </div>
  );
};
