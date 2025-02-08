import styles from './Header.module.scss';
import Link from 'next/link';

export const Header = () => {
  return (
    <header className={styles.header} id="header">
      <div className={styles.container}>
        <div className={styles.row}>
          <Link href="/" className={styles.logo}>
            Aurora
          </Link>
          <nav className={styles.nav}>
            {/* Text-based menu */}
            <ul className={styles.menu}>
              <li>
                <Link href="/planner" className={styles.active}>
                  Planner
                </Link>
              </li>
              <li>
                <Link href="/blog">Blog</Link>
              </li>
              <li>
                <Link href="/about">Contact me</Link>
              </li>
            </ul>

            {/* Icon-based menu */}
            <ul className={styles.iconMenu}>
              <li className={styles.favorite}>
                <Link
                  href="/favorite"
                  className={styles.favoriteLink}
                  aria-label="Favorites">
                  <svg className={styles.icon}>
                    <use href="/img/svgsprite/sprite.svg#like"></use>
                  </svg>
                  <sup className={styles.counter} data-value="0"></sup>
                </Link>

                {/* Dropdown List */}
                <div className={styles.dropdown}>
                  <ul className={styles.dropdownList}>
                    <li className={styles.dropdownItem}>
                      <img
                        src="/img/9.jpg"
                        alt="Item 1"
                        className={styles.dropdownImg}
                      />
                      <p className={styles.dropdownDescription}>
                        Item 1 Description
                      </p>
                    </li>
                  </ul>
                  <p className={styles.dropdownMessage}>Nothing here yet</p>
                  <Link href="/favorites" className={styles.dropdownButton}>
                    Manage favorites
                  </Link>
                </div>
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
