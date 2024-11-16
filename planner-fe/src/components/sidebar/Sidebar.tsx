'use client';

import { usePathname } from 'next/navigation';
import { routes } from '@/constants/routes';
import Link from 'next/link';
import { LogOut, Notification } from '@/components';

import { FiSettings, FiActivity, FiCalendar } from 'react-icons/fi';

import styles from './sidebar.module.scss';
import classNames from 'classnames';
import { useAuthStore } from '@/store';

const menuItems = [
  { label: 'Планувальник', href: routes.planner, icon: <FiCalendar /> },
  { label: 'Статистика', href: routes.statistics, icon: <FiActivity /> },
];

const privateMenuItems = [
  { label: 'Налаштування', href: routes.settings, icon: <FiSettings /> },
];

const notificationMessage =
  'Якщо хочете зберегати статистику увійдіть або зареєструйтесь';

export const Sidebar = () => {
  const pathname = usePathname();
  const user = useAuthStore((state) => state.userAuth);

  const visibleMenuItems = user
    ? [...menuItems, ...privateMenuItems]
    : menuItems;

  return (
    <div className={styles.sideBar}>
      <div className={styles.menu}>
        {visibleMenuItems.map(({ label, href, icon }) => (
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
      <div className={styles.logOut}>
        {!user && <Notification message={notificationMessage} />}
        <div className={styles.button}>
          {user ? (
            <LogOut />
          ) : (
            <Link
              href={routes.login}
              className={classNames(styles.buttonStyle, styles.outlineButton)}>
              Увійти
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
