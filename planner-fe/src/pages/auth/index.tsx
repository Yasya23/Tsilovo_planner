import DefaultLayout from '@/shared/components/layouts/Default';
import AuthForm from '@/shared/components/forms/auth/AuthForm';
import styles from './AuthPage.module.scss';

interface Props {
  mode: 'login' | 'register';
}

export const AuthPage = ({ mode = 'login' }: Props) => {
  return (
    <DefaultLayout>
      <div className={styles.Container}>
        <AuthForm mode={mode} />
      </div>
    </DefaultLayout>
  );
};

export default AuthPage;
