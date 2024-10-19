'use client';

import { useState } from 'react';
import { Logo, LogOut } from '@/components';
import Link from 'next/link';
import { FiUser } from 'react-icons/fi';
import { useAuthStore } from '@/store/AuthStore';
import { routes } from '@/constants/routes';

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
    <header
      className={classNames(styles.header, isDark ? styles.darkTheme : '')}>
      <div className={styles.wrapper}>
        {/* <button className={styles.toggleBtn} onClick={toggleMenu}>
          {isMenuOpen ? <FiX /> : <FiMenu />}
        </button> */}
        <Logo />
        <div className={styles.linksWrapper}>
          <Link
            href={routes.profile}
            className={classNames(styles.buttonStyle, styles.withIcon)}>
            <FiUser size={20} /> Планувальник
          </Link>

          {user ? (
            <LogOut />
          ) : (
            <Link
              href={routes.login}
              className={classNames(styles.buttonStyle, styles.outlineButton)}>
              Увійти
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
