'use client';

import useLogOut from '@/hooks/useLogOut';
import { FiLogOut } from 'react-icons/fi';
import classNames from 'classnames';

import styles from './logout.module.scss';

export const LogOut = () => {
  const { logOut } = useLogOut();

  return (
    <div
      role="button"
      className={classNames(
        styles.logOutButton,
        styles.withIcon,
        styles.outlineBorder
      )}
      onClick={() => logOut()}>
      <FiLogOut />
      Вийти
    </div>
  );
};

export default LogOut;
