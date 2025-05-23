import { useTranslations } from 'next-intl';

import icons from '@/shared/icons/icons';
import { useAuthContext } from '@/shared/providers/AuthProvider';

import { IconButtonCustom } from './buttons/IconButton';

export const LogOut = () => {
  const { logout } = useAuthContext();
  const t = useTranslations('Common.buttons');

  return (
    <IconButtonCustom
      name={t('logout')}
      icon={<icons.Exit />}
      color="warning"
      onClick={() => logout()}
    />
  );
};

export default LogOut;
