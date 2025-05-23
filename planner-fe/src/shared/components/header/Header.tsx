'use client';

import { useTranslations } from 'next-intl';

import classNames from 'classnames';

import LanguageToggle from '@/shared/components/LanguageSwitch';
import { routes } from '@/shared/constants/routes';
import { useScrollThreshold } from '@/shared/hooks/useScrollThreshold';

import { ButtonCustom } from '../buttons/Button';
import Logo from '../logo/Logo';
import styles from './Header.module.scss';

export const Header = () => {
  const isSticky = useScrollThreshold(150);
  const t = useTranslations('Common.buttons');

  return (
    <header
      className={classNames(styles.Header, { [styles.Sticky]: isSticky })}
    >
      <div className={styles.Wrapper}>
        <Logo />
        <div className={styles.Menu}>
          <LanguageToggle />
          <ButtonCustom
            href={routes.planner}
            name={t('startPlanning')}
            style="contained"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
