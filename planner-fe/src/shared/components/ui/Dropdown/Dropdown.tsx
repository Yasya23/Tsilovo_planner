'use client';

import { ReactNode, useRef, useState } from 'react';

import { useClickOutside } from '@/shared/hooks/ useClickOutside';

import { Divider, DividerItemType } from './_parts/divider/Divider';
import { MenuItemComponent, MenuItemType } from './_parts/menu-item/MenuItem';
import { Message, MessageItemType } from './_parts/message/Message';
import styles from './Dropdown.module.scss';

type MenuItem = MenuItemType | DividerItemType | MessageItemType;

type DropdownProps = {
  trigger: ReactNode;
  menuItems: MenuItem[];
};

export const Dropdown = ({ trigger, menuItems }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useClickOutside(dropdownRef, () => setIsOpen(false));

  const handleItemClick = (item: MenuItem) => {
    if ('action' in item) item.action?.();
    if (!('href' in item)) setIsOpen(false);
  };

  return (
    <div className={styles.Dropdown} ref={dropdownRef}>
      <div
        onClick={() => setIsOpen((prev) => !prev)}
        className={styles.Trigger}
      >
        {trigger}
      </div>

      {isOpen && (
        <ul className={styles.Menu} role="menu">
          {menuItems.map((item, index) => {
            if (item.type === 'divider') return <Divider key={index} />;
            if (item.type === 'message')
              return <Message key={index} {...item} />;
            return (
              <MenuItemComponent
                key={index}
                item={item}
                onClick={() => handleItemClick(item)}
              />
            );
          })}
        </ul>
      )}
    </div>
  );
};
