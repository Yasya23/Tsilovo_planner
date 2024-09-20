'use client';

import UpdateInfo from '@/components/forms/auth/UpdateInfo';
import styles from './settings.module.scss';
import { useAuthStore } from '@/store/Store';
import Spinner from '@/components/spinner/Spinner';

export const Settings = () => {
  const user = useAuthStore((state) => state.userAuth);

  if (!user) return <Spinner />;

  return (
    <div className={styles.wrapper}>
      <div className={styles.block}>
        <UpdateInfo />
      </div>
    </div>
  );
};

export default Settings;
