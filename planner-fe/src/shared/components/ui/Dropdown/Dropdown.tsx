'use client';

import { useState, useRef, ReactNode } from 'react';
import styles from './Dropdown.module.scss';
import IconButtonCustom from '../buttons/IconButton';
import useClickOutside from '@/shared/hooks/ useClickOutside';

interface MenuItem {
  icon?: ReactNode;
  title: string;
  action: () => void;
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

  useClickOutside(dropdownRef, () => setIsOpen(false));

  return (
    <div className={styles.Dropdown} ref={dropdownRef}>
      <div className={styles.Trigger}></div>
      <IconButtonCustom
        icon={trigger}
        name="Menu"
        onClick={toggleDropdown}
        size="medium"
      />

      {isOpen && (
        <ul className={styles.Menu}>
          {menuItems.map((item, index) => (
            <li
              key={index}
              className={styles.MenuItem}
              onClick={() => {
                item.action();
                closeDropdown();
              }}>
              {item.icon && <span className={styles.Icon}>{item.icon}</span>}
              <span>{item.title}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
