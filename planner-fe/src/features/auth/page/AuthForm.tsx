'use client';

import { useTranslations } from 'next-intl';

import DefaultLayout from '@/shared/components/layouts/Default';

import { useAuth } from '@/features/auth/hooks/useAuth';

import GoogleAuthButton from '../components/GoogleAuthButton';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import styles from './AuthForm.module.scss';

export const AuthForm = ({ mode }: { mode: 'login' | 'register' }) => {
  const t = useTranslations('Common');
  const { isPending, error, login, register } = useAuth();

  return (
    <DefaultLayout>
      <div className={styles.Container}>
        <div className={styles.Wrapper}>
          <h1 className={styles.Title}>{t(`buttons.${mode}`)}</h1>
          <GoogleAuthButton disabled={isPending} />
          <div>{t('buttons.or')}</div>

          {mode === 'login' ? (
            <LoginForm isPending={isPending} login={login} />
          ) : (
            <RegisterForm isPending={isPending} handleRegister={register} />
          )}
        </div>
      </div>
    </DefaultLayout>
  );
};

export default AuthForm;
