import IconButtonCustom from './ui/buttons/IconButton';
import { FiLogOut } from 'react-icons/fi';
import { useTranslations } from 'next-intl';
import { useAuthContext } from '@/features/auth/context/AuthProvider';

export const LogOut = () => {
  const { logout } = useAuthContext();
  const t = useTranslations('Common.buttons');

  return (
    <IconButtonCustom
      name={t('logout')}
      icon={<FiLogOut />}
      color="secondary"
      onClick={() => logout()}
    />
  );
};

export default LogOut;
