'use client';

import { useTranslations } from 'next-intl';

import { AddImage } from '@/features/settings/components/_parts/add-image/AddImage';

import styles from './Settings.module.scss';

export const Settings = () => {
  const t = useTranslations('Common.settings');
  return (
    <div className={styles.wrapper}>
      <h1>Settings</h1>
      <AddImage />
    </div>
  );
};

export default Settings;
