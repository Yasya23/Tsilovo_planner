'use client';

import { useTranslations } from 'next-intl';

import DefaultLayout from '@/shared/components/layouts/Default';

import { useAuth } from '@/features/auth/hooks/useAuth';

import styles from './AuthForm.module.scss';
import GoogleAuthButton from './parts/GoogleAuthButton';
import LoginForm from './parts/LoginForm';
import RegisterForm from './parts/RegisterForm';

export const AuthForm = ({ mode }: { mode: 'login' | 'register' }) => {
  const t = useTranslations('Common');
  const { user, isPending, error, login, register } = useAuth();

  return (
    <DefaultLayout>
      <div className={styles.Container}>
        <div className={styles.Wrapper}>
          {mode === 'login' && (
            <>
              <h1 className={styles.Title}>{t('buttons.login')}</h1>
              <GoogleAuthButton disabled={isPending} />
              <div>{t('buttons.or')}</div>

              <LoginForm
                user={user}
                isPending={isPending}
                error={error}
                login={login}
              />
            </>
          )}
          {mode === 'register' && (
            <>
              <h1 className={styles.Title}>{t('buttons.register')}</h1>
              <GoogleAuthButton disabled={isPending} />
              <div>{t('buttons.or')}</div>

              <RegisterForm
                user={user}
                isPending={isPending}
                error={error}
                register={register}
              />
            </>
          )}
        </div>
      </div>
    </DefaultLayout>
  );
};

export default AuthForm;
