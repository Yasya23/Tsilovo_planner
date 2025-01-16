'use client';

import { useState } from 'react';
import { Logo } from '@/components/logo/Logo';
import { LogOut } from '@/components/buttons/logOut/LogOut';
import { Navigation } from '@/components/navigation/Navigation';
import { useAuthStore } from '@/store/AuthStore';

import styles from './header.module.scss';
import classNames from 'classnames';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const user = useAuthStore((state) => state.userAuth);

  const isDark = true;

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className={styles.header}>
      <div className={styles.wrapper}>
        {/* <button className={styles.toggleBtn} onClick={toggleMenu}>
          {isMenuOpen ? <FiX /> : <FiMenu />}
        </button> */}
        <Logo />
        <div>
          <Navigation />
        </div>

        <div>{user && <LogOut />}</div>
      </div>
    </header>
  );
};

export default Header;
