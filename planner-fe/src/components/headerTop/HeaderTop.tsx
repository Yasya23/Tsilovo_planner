import Link from 'next/link';
import classNames from 'classnames';

import styles from './headerTop.module.scss';

export const HeaderTop = () => {
  return (
    <div className={styles.headerTop}>
      <div className={classNames('container', styles.container)}>
        <nav className={styles.nav} aria-label="Header top navigation">
          <ul className={styles.navList}>
            <li className={styles.navItem}>
              <Link href="/favorites">FAVORITES</Link>
            </li>
            <li className={styles.navItem}>
              <Link href="/terms">TERMS OF SERVICES</Link>
            </li>
          </ul>
        </nav>

        <div className={styles.lang}>
          <Link href="/" className={classNames(styles.langLink, styles.active)}>
            🇬🇧 EN
          </Link>
          <Link href="/ua" className={styles.langLink}>
            🇺🇦 УК
          </Link>
        </div>
      </div>
    </div>
  );
};
