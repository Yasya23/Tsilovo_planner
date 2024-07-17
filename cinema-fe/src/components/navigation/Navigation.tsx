'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { navigationMenu } from '@/constants/navigationMenu';
import classNames from 'classnames';

import styles from './nav.module.scss';

const Navigation = () => {
  const pathname = usePathname();

  return (
    <nav>
      <ul className={styles.nav}>
        {navigationMenu.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className={classNames({
                [styles.active]: pathname === item.href,
              })}>
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navigation;
