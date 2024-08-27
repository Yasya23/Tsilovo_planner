'use client';

import GradientCard from '../cards/gradientCard/GradientCard';
import { FiSettings, FiBookmark, FiUser } from 'react-icons/fi';
import { routes } from '@/constants/routes';
import { useAuthStore } from '@/store/Store';
import styles from './profile.module.scss';

const Profile = () => {
  const user = useAuthStore((state) => state.userAuth);

  const userName = user?.name ? user.name : 'Guest';

  return (
    <div className={styles.wrapper}>
      <h1>Welcome to your profile, {userName}</h1>
      <div className={styles.menu}>
        <GradientCard
          title="Settings"
          href={routes.setting}
          color="pink"
          icon={<FiSettings />}
        />
        <GradientCard
          title="Favorites"
          href={routes.favorites}
          color="purple"
          icon={<FiBookmark />}
        />
        <GradientCard
          title="Admin Panel"
          href={routes.admin}
          color="teal"
          icon={<FiUser />}
        />
      </div>
    </div>
  );
};

export default Profile;
