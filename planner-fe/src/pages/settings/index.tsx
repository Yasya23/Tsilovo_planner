'use client';

import { UpdateInfo } from '@/shared/components/forms/UpdateInfo';
import { useAuthStore } from '@/shared/store/AuthStore';

import styles from './Settings.module.scss';

export const Settings = () => {
  const user = useAuthStore((state) => state.userAuth);

  return (
    <div className={styles.wrapper}>
      <div className={styles.block}>
        <UpdateInfo />
      </div>
    </div>
  );
};

export default Settings;
