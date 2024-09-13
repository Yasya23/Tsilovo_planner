import styles from './logout.module.scss';
import classNames from 'classnames';
import useLogOut from '@/hooks/useLogOut';
import { FiLogOut } from 'react-icons/fi';

export const LogOut = () => {
  const { logOut } = useLogOut();

  return (
    <div
      role="button"
      className={classNames(
        styles.logOutButton,
        styles.withIcon,
        styles.outlineButton
      )}
      onClick={() => logOut()}>
      <FiLogOut />
      Вийти
    </div>
  );
};

export default LogOut;
