import styles from './logout.module.scss';
import classNames from 'classnames';
import useLogOut from '@/hooks/useLogOut';

export const LogOut = () => {
  const { logOut } = useLogOut();

  return (
    <div
      role="button"
      className={classNames(styles.logOutButton, styles.buttonStyle)}
      onClick={() => logOut()}>
      LOG OUT
    </div>
  );
};

export default LogOut;
