import useLogOut from '@/hooks/useLogOut';
import IconButtonCustom from './iconButton/IconButton';

export const LogOut = () => {
  const { logOut } = useLogOut();

  return <IconButtonCustom type="logout" onClick={() => logOut()} />;
};

export default LogOut;
