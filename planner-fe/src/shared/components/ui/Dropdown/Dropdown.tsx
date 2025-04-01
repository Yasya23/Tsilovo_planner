'use client';

import { useState, useRef, ReactNode } from 'react';
import styles from './Dropdown.module.scss';
import { useClickOutside } from '@/shared/hooks/ useClickOutside';
import Link from 'next/link';

export interface MenuItem {
  icon?: ReactNode;
  title?: string;
  action?: () => void;
  href?: string;
  type?: 'button' | 'link' | 'divider';
}

interface DropdownProps {
  trigger: ReactNode;
  menuItems: MenuItem[];
}

const Dropdown = ({ trigger, menuItems }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setIsOpen((prev) => !prev);
  const closeDropdown = () => setIsOpen(false);

  useClickOutside(dropdownRef, closeDropdown);

  return (
    <div className={styles.Dropdown} ref={dropdownRef}>
      <div onClick={toggleDropdown} className={styles.Trigger}>
        {trigger}
      </div>

      {isOpen && (
        <ul className={styles.Menu} role="menu">
          {menuItems.map((item, index) => {
            if (item.type === 'divider') {
              return <hr key={index} className={styles.Divider} />;
            }

            return (
              <li
                key={index}
                className={styles.MenuItem}
                role="menuitem"
                tabIndex={0}
                onClick={() => {
                  if (item.action) item.action();
                  closeDropdown();
                }}>
                {item.icon && <span className={styles.Icon}>{item.icon}</span>}

                {item.type === 'link' && item.href ? (
                  <Link href={item.href} className={styles.Link}>
                    {item.title}
                  </Link>
                ) : (
                  <span>{item.title}</span>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
