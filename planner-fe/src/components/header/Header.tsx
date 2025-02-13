import Link from 'next/link';
import classNames from 'classnames';

import styles from './Header.module.scss';

export const Header = () => {
  return (
    <header className={styles.header} id="header">
      <div className={styles.container}>
        <div className={styles.row}>
          <Link href="/" className={styles.logo}>
            Tempo
          </Link>
          <nav className={styles.nav}>
            <ul className={styles.menu}>
              <li>
                <Link href="/planner" className={styles.active}>
                  Планувальник
                </Link>
              </li>
              <li>
                <Link href="/downloads">Як це працює</Link>
              </li>
            </ul>
          </nav>
          <button
            className={styles.mobileButton}
            type="button"
            aria-label="Toggle navigation menu">
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </header>
  );
};
