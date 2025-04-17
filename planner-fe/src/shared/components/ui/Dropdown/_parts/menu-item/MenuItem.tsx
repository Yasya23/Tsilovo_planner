import { ReactNode } from 'react';

import Link from 'next/link';

import styles from './Item.module.scss';

type ButtonItem = {
  icon?: ReactNode;
  title: string;
  action: () => void;
  type: 'button';
};

type LinkItem = {
  icon?: ReactNode;
  title: string;
  href: string;
  type: 'link';
};

export type MenuItemType = ButtonItem | LinkItem;

type MenuItemProps = { item: MenuItemType; onClick: () => void };

export const MenuItemComponent = ({ item, onClick }: MenuItemProps) => (
  <li
    className={styles.MenuItem}
    role="menuitem"
    tabIndex={0}
    onClick={onClick}
  >
    {item.icon && <span className={styles.Icon}>{item.icon}</span>}
    {item.type === 'link' ? (
      <Link href={item.href} className={styles.Link} onClick={onClick}>
        {item.title}
      </Link>
    ) : (
      <span>{item.title}</span>
    )}
  </li>
);
