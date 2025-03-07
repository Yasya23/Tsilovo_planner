import Link from 'next/link';
import LanguageToggle from '../ui/LanguageSwitch';
import ThemeToggle from '../ui/themeToggle/ThemeToggle';

import styles from './Footer.module.scss';

export const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.Footer}>
      <div className={styles.Container}>
        <div className={styles.Settings}>
          <LanguageToggle />
          <ThemeToggle />
        </div>
        <div className={styles.Info}>
          <p className={styles.InfoLink}>
            Open-source code available on{' '}
            <Link href="https://github.com/Yasya23/personalPlanner">
              GitHub
            </Link>
            .
          </p>
          <p className={styles.InfoCopyright}>©{year}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
