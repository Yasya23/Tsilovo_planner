'use client';

import { useState } from 'react';

import { useTranslations } from 'next-intl';
import Image from 'next/image';

import classNames from 'classnames';

import styles from './Showcase.module.scss';

const menuItems = [
  {
    labelKey: 'showcase.planner',
    src: '/images/planner.png',
    alt: 'Planner main page',
    width: 800,
    height: 500,
  },
  // {
  // "labelKey": "showcase.statistics",
  //   src: '/images/statistics.png',
  //   alt: 'Statistics page',
  //   width: 800,
  //   height: 500,
  // },
  // {
  // "labelKey": "showcase.settings",
  //   src: '/images/settings.png',
  //   alt: 'Settings page',
  //   width: 800,
  //   height: 500,
  // },
  {
    labelKey: 'showcase.help',
    src: '/images/help.png',
    alt: 'Help page',
    width: 800,
    height: 500,
  },
];

export const HeroShowcase = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const t = useTranslations('HomePage');

  const handleClick = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <section className={styles.HeroSection}>
      <h2 className={styles.Title}>{t('showcase.title')}</h2>
      <nav className={styles.Nav}>
        {menuItems.map((item, index) => (
          <button
            key={item.labelKey}
            className={classNames(styles.NavButton, {
              [styles.Active]: index === activeIndex,
            })}
            onClick={() => handleClick(index)}
          >
            {t(item.labelKey)}
          </button>
        ))}
      </nav>

      <div className={styles.ScreenshotWrapper}>
        {menuItems.map((screenshot, index) => (
          <Image
            key={screenshot.src}
            src={screenshot.src}
            alt={screenshot.alt}
            width={screenshot.width}
            height={screenshot.height}
            className={classNames(
              styles.Screenshot,
              index === activeIndex ? styles.Visible : styles.Hidden
            )}
          />
        ))}
      </div>
    </section>
  );
};
