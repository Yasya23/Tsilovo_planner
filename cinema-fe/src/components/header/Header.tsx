'use client';

import { useState } from 'react';
import Logo from '@/components/logo/Logo';
import Navigation from '@/components/navigation/Navigation';
import Link from 'next/link';
import { FiMenu, FiX, FiSearch, FiList } from 'react-icons/fi';
import { useAuthStore } from '@/store/Store';
import { isUserAuthEmpty } from '@/helpers/storage/checkLocalStorage';
import styles from './header.module.scss';
import classNames from 'classnames';

const HeaderLayout = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const user = useAuthStore((state) => state.userAuth);
  const userExist = isUserAuthEmpty();

  console.log(userExist);
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
          <Link href="/search" className={styles.withIcon}>
            <FiSearch size={20} />
            Search
          </Link>
          <Link href="/filter" className={styles.withIcon}>
            <FiList size={20} />
            Filters
          </Link>
          {user && userExist ? (
            <Link href="/login" className={styles.buttonStyle}>
              LOG OUT
            </Link>
          ) : (
            <Link href="/login" className={styles.buttonStyle}>
              LOG IN
            </Link>
          )}
        </div>
      </div>
      {isMenuOpen && (
        <div className={styles.mobileNavMenu}>
          <Link href="/search" className={classNames(styles.withIcon)}>
            <FiSearch size={30} />
            Search
          </Link>
          <Link href="/filter" className={classNames(styles.withIcon)}>
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
