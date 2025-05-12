import { useTranslations } from 'next-intl';

import icons from '@/shared/icons/icons';

import { useAuthContext } from '@/features/auth/context/AuthProvider';

import { IconButtonCustom } from './buttons/IconButton';

export const LogOut = () => {
  const { logout } = useAuthContext();
  const t = useTranslations('Common.buttons');

  return (
    <IconButtonCustom
      name={t('logout')}
      icon={<icons.Exit />}
      color="secondary"
      onClick={() => logout()}
    />
  );
};

export default LogOut;
