'use client';

import { usePathname } from 'next/navigation';
import { routes } from '@/constants/routes';
import Link from 'next/link';
import { LogOut } from '@/components/buttons/logOut/LogOut';
import { Notification } from '@/components/notificationMessage/Notification';
import { useAuthStore } from '@/store';
import classNames from 'classnames';
import { FiSettings, FiActivity, FiCalendar } from 'react-icons/fi';

import styles from './Sidebar.module.scss';

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
            className={classNames(styles.menuLink, {
              [styles.active]: pathname === href,
            })}>
            {icon} {label}
          </Link>
        ))}
      </div>
      <div className={styles.auth}>
        {!user && <Notification message={notificationMessage} />}
        <div>
          {user ? (
            <LogOut />
          ) : (
            <Link href={routes.login} className={styles.loginLink}>
              Увійти
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};
