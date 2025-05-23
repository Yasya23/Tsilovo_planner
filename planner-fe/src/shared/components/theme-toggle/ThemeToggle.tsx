'use client';

import { useEffect, useState } from 'react';

import { useTranslations } from 'next-intl';
import { useTheme } from 'next-themes';

import { IconButtonCustom } from '@/shared/components/buttons/IconButton';
import icons from '@/shared/icons/icons';

import styles from './ThemeToggle.module.scss';

const themes = [
  { themeKey: 'light', icon: <icons.Sun /> },
  { themeKey: 'system', icon: <icons.Monitor /> },
  { themeKey: 'dark', icon: <icons.Moon /> },
];

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const t = useTranslations('Common.theme');

  useEffect(() => {
    setMounted(true);
  }, []);

  const defaultTheme = mounted ? theme || 'system' : 'system';

  return (
    <ul className={styles.Wrapper}>
      {themes.map(({ themeKey, icon }) => {
        const isActive = defaultTheme === themeKey;

        return (
          <li key={themeKey} className={isActive ? styles.Active : ''}>
            <IconButtonCustom
              icon={icon}
              name={t(themeKey)}
              size="small"
              onClick={() => setTheme(themeKey)}
            />
          </li>
        );
      })}
    </ul>
  );
};

export default ThemeToggle;
