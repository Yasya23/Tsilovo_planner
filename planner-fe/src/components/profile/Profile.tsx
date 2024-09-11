'use client';

import { useAuthStore } from '@/store/Store';
import styles from './profile.module.scss';

const Profile = () => {
  const user = useAuthStore((state) => state.userAuth);

  const userName = user?.name ? user.name : 'Guest';

  return (
    <div className={styles.wrapper}>
      <h1>Welcome to your profile, {userName}</h1>
    </div>
  );
};

export default Profile;
