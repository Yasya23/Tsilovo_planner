'use client';

import { UpdateInfo } from '@/shared/components/forms/UpdateInfo';

import styles from './Settings.module.scss';

export const Settings = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.block}>
        <UpdateInfo />
      </div>
    </div>
  );
};

export default Settings;
