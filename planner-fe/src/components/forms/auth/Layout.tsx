import Link from 'next/link';
import { routes } from '@/constants/routes';
import classNames from 'classnames';

import styles from './forms.module.scss';

interface Props {
  page?: string;
  children: React.ReactNode;
}

const Layout = ({ page = 'login', children }: Props) => {
  const isLoginPage = page === 'login';

  return (
    <div className={styles.wrapper}>
      <div className={styles.switchPage}>
        <Link
          href={routes.login}
          className={classNames(styles.button, {
            [styles.disabled]: isLoginPage,
          })}>
          Увійти
        </Link>
        <Link
          href={routes.register}
          className={classNames(styles.button, {
            [styles.disabled]: !isLoginPage,
          })}>
          Реєстрація
        </Link>
      </div>
      {children}
    </div>
  );
};

export default Layout;
