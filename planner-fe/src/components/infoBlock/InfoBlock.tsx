'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import classNames from 'classnames';
import { IoClose } from 'react-icons/io5';
import styles from './InfoBlock.module.scss';

export const InfoBlock = () => {
  const [isClosed, setIsClosed] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem('info-block')) {
      setIsClosed(true);
    }
  }, []);

  const handleClose = () => {
    setIsClosed(true);
    sessionStorage.setItem('info-block', 'true');
  };

  return (
    <div
      className={classNames(styles.infoBlock, { [styles.closed]: isClosed })}>
      <div className={styles.container}>
        <div className={styles.content}>
          <Link href="/collections" className={styles.link}>
            -40% for each second thing from one collection
          </Link>
          <button
            className={styles.closeButton}
            onClick={handleClose}
            aria-label="Close information block">
            <IoClose />
          </button>
        </div>
      </div>
    </div>
  );
};
