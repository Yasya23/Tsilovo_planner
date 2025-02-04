'use client';

import useLogOut from '@/hooks/useLogOut';
import { FiLogOut } from 'react-icons/fi';
import { Button } from '../button/Button';

export const LogOut = () => {
  const { logOut } = useLogOut();

  return (
    <Button
      type="button"
      style="primary-hover-gradient"
      onClick={() => logOut()}
      icon={<FiLogOut />}
      name="Вийти"
    />
  );
};
