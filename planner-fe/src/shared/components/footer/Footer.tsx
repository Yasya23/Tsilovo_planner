import Link from 'next/link';

import Logo from '@/shared/components/logo/Logo';
import ThemeToggle from '@/shared/components/themeToggle/ThemeToggle';
import TooltipCustom from '@/shared/components/Tooltip';
import icons from '@/shared/icons/icons';

import styles from './Footer.module.scss';

export const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.Footer}>
      <div className={styles.Container}>
        <div className={styles.Wrapper}>
          <div className={styles.Info}>
            <Logo />
            <p className={styles.SocialMedia}>
              <TooltipCustom title="GitHub">
                <Link
                  href="https://github.com/Yasya23/personalPlanner"
                  aria-label="GitHub"
                >
                  <icons.GitHub />
                </Link>
              </TooltipCustom>
              <TooltipCustom title="Email">
                <Link href="mailto:yana.zahoruiko@gmail.com" aria-label="Email">
                  <icons.Mail />
                </Link>
              </TooltipCustom>
            </p>
          </div>
          <ThemeToggle />
        </div>
        <p className={styles.InfoCopyright}>©{year} Yana Zahoruiko</p>
      </div>
    </footer>
  );
};

export default Footer;
