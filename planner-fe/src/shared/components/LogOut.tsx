import useLogOut from '@/shared/hooks/useLogOut';
import IconButtonCustom from './ui/buttons/IconButton';
import { FiLogOut } from 'react-icons/fi';
import { useTranslations } from 'next-intl';

export const LogOut = () => {
  const { logOut } = useLogOut();
  const t = useTranslations('Common.buttons');

  return (
    <IconButtonCustom
      name={t('logout')}
      icon={<FiLogOut />}
      color="secondary"
      onClick={() => logOut()}
    />
  );
};

export default LogOut;
