'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaHome, FaFilePdf, FaPaintBrush, FaEnvelope } from 'react-icons/fa';

import classNames from 'classnames';
import styles from './navigation.module.scss';
import { routes } from '@/constants/routes';

const navItems = [
  { title: 'Головна', path: '/', icon: <FaHome /> },
  { title: 'Матеріали', path: '/materials', icon: <FaFilePdf /> },
  { title: 'Планувальник', path: routes.planner, icon: <FaPaintBrush /> },
  { title: 'Контакти', path: '/contact', icon: <FaEnvelope /> },
];

export const Navigation = () => {
  const pathname = usePathname();

  return (
    <nav>
      <ul className={styles.nav}>
        {navItems.map((item, index) => (
          <li key={index} className={styles.navItem}>
            <Link
              href={item.path}
              className={classNames(
                {
                  [styles.active]: pathname === item.path,
                },
                styles.navLink
              )}>
              {item.icon}
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navigation;
