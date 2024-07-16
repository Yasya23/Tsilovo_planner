'use client';

import React, { useState } from 'react';
import Logo from '@/components/logo/Logo';
import Navigation from '@/components/navigation/Navigation';
import Link from 'next/link';
import { FiMenu, FiX } from 'react-icons/fi';

import styles from './header.module.scss';

const HeaderLayout = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
        <Link href="/login">LOG IN</Link>
      </div>
      {isMenuOpen && (
        <div className={styles.mobileNavMenu}>
          <Navigation />
        </div>
      )}
    </header>
  );
};

export default HeaderLayout;
