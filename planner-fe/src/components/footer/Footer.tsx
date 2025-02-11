import Link from 'next/link';
import { FaGithub } from 'react-icons/fa';

import styles from './Footer.module.scss';
import classNames from 'classnames';

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={classNames('container', styles.container)}>
        <div className={styles.wrapper}>
          <nav className={styles.nav}>
            <ul className={styles.navList}>
              <li className={styles.navItem}>
                <Link href="favorites.html">FAVORITES</Link>
              </li>
              <li className={styles.navItem}>
                <Link href="terms.html">TERMS OF SERVICES</Link>
              </li>
            </ul>
          </nav>
          <p className={styles.copyright}>© 2025 Zahoruiko Yana</p>
        </div>
        <div className={styles.wrapper}>
          <form className={styles.subscription}>
            <div className={styles.subscriptionWrapper}>
              <input type="email" placeholder="musyart@gmail.com" />
              <span className={styles.subscriptionLabel}>
                Give an email, get the newsletter.
              </span>
              <button type="submit">Subscribe</button>
            </div>
            <p className={styles.subscriptionMessage}></p>
          </form>
          <ul className={styles.socialList}>
            <li className={styles.socialItem}>
              <Link
                href="https://www.pinterest.com/musyaart/"
                aria-label="Link to GitHub">
                <FaGithub />
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};
