'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { routes } from '@/shared/constants/routes';
import { FiActivity, FiCalendar, FiSettings } from 'react-icons/fi';
import Logo from '@/shared/components/ui/logo/Logo';
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
