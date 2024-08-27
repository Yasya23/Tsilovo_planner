import GradientCard from '../cards/gradientCard/GradientCard';
import { FiSettings, FiBookmark } from 'react-icons/fi';
import { routes } from '@/constants/routes';

const Profile = () => {
  return (
    <div>
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
        icon={<FiBookmark />}
      />
    </div>
  );
};

export default Profile;
