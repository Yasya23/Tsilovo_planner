'use client';

import { UpdateInfo } from '@/components/forms/auth/UpdateInfo';
import { useAuthStore } from '@/store/AuthStore';
import BackToMain from '@/components/buttons/backToMain/BackToMain';

import styles from './settings.module.scss';

export const Settings = () => {
  const user = useAuthStore((state) => state.userAuth);

  return (
    <div className={styles.wrapper}>
      {user ? (
        <div className={styles.block}>
          <UpdateInfo />
        </div>
      ) : (
        <BackToMain message="Сторінка доступна тільки для авторизованих  користувачів :(" />
      )}
    </div>
  );
};

export default Settings;
