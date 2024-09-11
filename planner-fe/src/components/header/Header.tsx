'use client';

import { useState } from 'react';
import Logo from '@/components/logo/Logo';
import Link from 'next/link';
import { FiMenu, FiX, FiUser } from 'react-icons/fi';
import { useAuthStore } from '@/store/Store';
import { routes } from '@/constants/routes';
import styles from './header.module.scss';
import classNames from 'classnames';
import LogOut from '../logOut/LogOut';

const HeaderLayout = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const user = useAuthStore((state) => state.userAuth);

  const isDark = true;

  console.log(user);
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
          {user && (
            <Link
              href={routes.profile}
              className={classNames(styles.buttonStyle, styles.withIcon)}>
              <FiUser size={20} /> Профіль
            </Link>
          )}
          {user ? (
            <LogOut />
          ) : (
            <>
              <Link href={routes.register} className={styles.buttonStyle}>
                Реєстрація
              </Link>
              <Link
                href={routes.login}
                className={classNames(
                  styles.buttonStyle,
                  styles.outlineButton
                )}>
                Увійти
              </Link>
            </>
          )}
        </div>
      </div>
      <hr />
    </header>
  );
};

export default HeaderLayout;
