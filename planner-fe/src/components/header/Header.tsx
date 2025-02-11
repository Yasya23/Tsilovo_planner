import Link from 'next/link';
import classNames from 'classnames';

import styles from './Header.module.scss';

export const Header = () => {
  return (
    <>
      <div className={styles.headerTop}>
        <div className={classNames('container', styles.container)}>
          <div></div>

          <div className={styles.lang}>
            <Link
              href="/"
              className={classNames(styles.langLink, styles.active)}>
              🇬🇧 EN
            </Link>
            <Link href="/ua" className={styles.langLink}>
              🇺🇦 УК
            </Link>
          </div>
        </div>
      </div>
      <header className={styles.header} id="header">
        <div className={styles.container}>
          <div className={styles.row}>
            <Link href="/" className={styles.logo}>
              Tempo
            </Link>
            <nav className={styles.nav}>
              {/* Text-based menu */}
              <ul className={styles.menu}>
                <li>
                  <Link href="/planner" className={styles.active}>
                    Планувальник
                  </Link>
                </li>
                <li>
                  <Link href="/downloads">Матеріали</Link>
                </li>
                <li>
                  <Link href="/blog">Блог</Link>
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
    </>
  );
};
