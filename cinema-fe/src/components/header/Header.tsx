'use client';

import { useState } from 'react';
import Logo from '@/components/logo/Logo';
import Navigation from '../navigation/Navigation';
import Link from 'next/link';
import { FiMenu, FiX, FiSearch, FiList, FiUser } from 'react-icons/fi';
import { useAuthStore } from '@/store/Store';
import { routes } from '@/constants/routes';
import styles from './header.module.scss';
import classNames from 'classnames';
import LogOut from '../logOut/LogOut';

const HeaderLayout = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const user = useAuthStore((state) => state.userAuth);

  console.log(user);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className={styles.header}>
      <div className={styles.wrapper}>
        <button className={styles.toggleBtn} onClick={toggleMenu}>
          {isMenuOpen ? <FiX /> : <FiMenu />}
        </button>
        <Logo />
        <div className={styles.dekstopNavMenu}>
          <Navigation />
        </div>
        <div className={styles.linksWrapper}>
          <Link href={routes.search} className={styles.withIcon}>
            <FiSearch size={20} />
            Search
          </Link>
          <Link href={routes.filter} className={styles.withIcon}>
            <FiList size={20} />
            Filters
          </Link>
          {user && (
            <Link
              href={routes.profile}
              className={classNames(styles.buttonStyle, styles.withIcon)}>
              <FiUser size={20} /> Profile
            </Link>
          )}
          {user ? (
            <LogOut />
          ) : (
            <Link href={routes.login} className={styles.buttonStyle}>
              LOG IN
            </Link>
          )}
        </div>
      </div>

      {isMenuOpen && (
        <div className={styles.mobileNavMenu}>
          {user && (
            <Link href={routes.profile} className={styles.withIcon}>
              <FiUser size={30} /> Profile
            </Link>
          )}
          <hr />
          <Link href={routes.search} className={styles.withIcon}>
            <FiSearch size={30} />
            Search
          </Link>
          <Link href={routes.filter} className={styles.withIcon}>
            <FiList size={30} />
            Filters
          </Link>
          <hr />
          <Navigation />
        </div>
      )}
    </header>
  );
};

export default HeaderLayout;
