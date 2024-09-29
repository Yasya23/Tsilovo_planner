'use client';

import UpdateInfo from '@/components/forms/auth/UpdateInfo';
import styles from './settings.module.scss';
import { useAuthStore } from '@/store/AuthStore';
import Spinner from '@/components/spinner/Spinner';
import { BackToMain } from '@/components/buttons';
export const Settings = () => {
  const user = useAuthStore((state) => state.userAuth);
  const anonimUser = useAuthStore((state) => state.anonimUser);

  if (!user) return <Spinner />;

  return (
    <div className={styles.wrapper}>
      {anonimUser ? (
        <BackToMain message="Сторінка не доступна для анонімних користувачів :(" />
      ) : (
        <div className={styles.block}>
          <UpdateInfo />
        </div>
      )}
    </div>
  );
};

export default Settings;
