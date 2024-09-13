'use client';

import { useAuthStore } from '@/store/Store';
import styles from './profile.module.scss';
import Spinner from '../spinner/Spinner';
const Profile = () => {
  const user = useAuthStore((state) => state.userAuth);

  const userName = user?.name ? user.name : 'Гість';

  return (
    <div className={styles.wrapper}>
      <Spinner />
      <h1>{userName}, вітаємо у твоєму профілі!</h1>
    </div>
  );
};

export default Profile;
