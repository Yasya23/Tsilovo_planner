'use client';

import styles from './nav.module.css';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { navigationMenu } from '@/constants/navigationMenu';
import classNames from 'classnames';

const Navigation = () => {
  const pathname = usePathname();

  return (
    <nav>
      <ul className={styles.nav}>
        {navigationMenu.map((item) => (
          <li
            key={item.href}
            className={classNames({
              [styles.active]: pathname === item.href,
            })}>
            <Link href={item.href}>{item.title}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navigation;
