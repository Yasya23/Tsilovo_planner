'use client';

import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';

import IconButtonCustom from '../ui/buttons/IconButton';
import { FiMoon, FiSun, FiMonitor } from 'react-icons/fi';

import styles from './ThemeToggle.module.scss';

const themes = [
  { themeKey: 'light', icon: <FiSun />, name: 'Світла тема' },
  { themeKey: 'system', icon: <FiMonitor />, name: 'Системна тема' },
  { themeKey: 'dark', icon: <FiMoon />, name: 'Темна тема' },
];

const ThemeToggle = () => {
  const { theme, setTheme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  console.log(theme);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <ul className={styles.Wrapper}>
      {themes.map(({ themeKey, icon, name }) => {
        const isActive = theme === themeKey;

        return (
          <li key={themeKey} className={isActive ? styles.Active : ''}>
            <IconButtonCustom
              icon={icon}
              name={name}
              size="small"
              onClick={() => setTheme(themeKey)}
              hasTooltip={false}
            />
          </li>
        );
      })}
    </ul>
  );
};

export default ThemeToggle;
