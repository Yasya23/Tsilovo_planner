import React from 'react';
import Link from 'next/link';
import styles from './logo.module.css';

const Logo = () => {
  return (
    <Link href="/" className={styles.logo}>
      CINEMA
    </Link>
  );
};

export default Logo;
