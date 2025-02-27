import useLogOut from '@/shared/hooks/useLogOut';
import IconButtonCustom from './ui/buttons/IconButton';
import { FiLogOut } from 'react-icons/fi';

export const LogOut = () => {
  const { logOut } = useLogOut();

  return (
    <IconButtonCustom
      name="Вийти"
      icon={<FiLogOut />}
      onClick={() => logOut()}
    />
  );
};

export default LogOut;
