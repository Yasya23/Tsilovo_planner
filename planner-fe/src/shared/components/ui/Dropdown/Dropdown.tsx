'use client';

import { useState, useRef, ReactNode } from 'react';
import { useClickOutside } from '@/shared/hooks/ useClickOutside';
import Link from 'next/link';
import styles from './index.module.scss';

export interface MenuItem {
  icon?: ReactNode;
  title?: string;
  action?: () => void;
  href?: string;
  type?: 'button' | 'link' | 'divider' | 'message';
}

interface DropdownProps {
  trigger: ReactNode;
  menuItems: MenuItem[];
}

export const Dropdown = ({ trigger, menuItems }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useClickOutside(dropdownRef, () => setIsOpen(false));

  const handleItemClick = (item: MenuItem) => {
    item.action?.();
    if (!item.href) setIsOpen(false);
  };

  return (
    <div className={styles.Dropdown} ref={dropdownRef}>
      <div
        onClick={() => setIsOpen((prev) => !prev)}
        className={styles.Trigger}>
        {trigger}
      </div>

      {isOpen && (
        <ul className={styles.Menu} role="menu">
          {menuItems.map((item, index) => {
            switch (item.type) {
              case 'divider':
                return <hr key={index} className={styles.Divider} />;
              case 'message':
                return (
                  <p key={index} className={styles.Message}>
                    {item.icon && (
                      <span className={styles.Icon}>{item.icon}</span>
                    )}
                    {item.title}
                  </p>
                );
              default:
                return (
                  <li
                    key={index}
                    className={styles.MenuItem}
                    role="menuitem"
                    tabIndex={0}
                    onClick={() => handleItemClick(item)}>
                    {item.icon && (
                      <span className={styles.Icon}>{item.icon}</span>
                    )}
                    {item.type === 'link' && item.href ? (
                      <Link
                        href={item.href}
                        className={styles.Link}
                        onClick={() => setIsOpen(false)}>
                        {item.title}
                      </Link>
                    ) : (
                      <span>{item.title}</span>
                    )}
                  </li>
                );
            }
          })}
        </ul>
      )}
    </div>
  );
};
