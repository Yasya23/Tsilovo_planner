import { useTranslations } from 'next-intl';
import Link from 'next/link';

import { routes } from '@/shared/constants/routes';

import styles from './Logo.module.scss';

export const Logo = () => {
  const t = useTranslations('Common');
  return (
    <Link href={routes.home} className={styles.Logo} aria-label="logo">
      {t('logo')}
    </Link>
  );
};

export default Logo;
