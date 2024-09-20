'use client';

import { useAuthStore } from '@/store/Store';
import styles from './profile.module.scss';

const Profile = () => {
  const user = useAuthStore((state) => state.userAuth);

  const userName = user?.name ? user.name : 'Гість';

  return (
    <div className={styles.wrapper}>
      <h1>{userName}, вітаємо у твоєму профілі!</h1>
    </div>
  );
};

export default Profile;
