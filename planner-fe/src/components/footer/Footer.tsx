import Link from 'next/link';
import { FaGithub } from 'react-icons/fa';

import styles from './footer.module.scss';

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className="footer__container">
        <div className="footer__wrapper">
          <nav className="footer__nav">
            <ul className="footer__nav-list">
              <li className="header-top__nav-item">
                <Link href="favorites.html">FAVORITES</Link>
              </li>
              <li className="header-top__nav-item">
                <Link href="terms.html">TERMS OF SERVICES</Link>
              </li>
            </ul>
          </nav>
          <p className="footer__copyright">© 2025 Zahoruiko Yana</p>
        </div>
        <div className="footer__wrapper">
          <form action="" className="footer__subscribtion">
            <div className="footer__subscribtion-wrapper">
              <input type="email" placeholder="musyart@gmail.com" />
              <span className="footer__subscribtion-label">
                Give an email, get the newsletter.
              </span>
              <button type="submit">Subscribe</button>
            </div>
            <p className="footer__subscribtion-message"></p>
          </form>
          <ul className="footer__social-list">
            <li className="footer__social-item">
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
