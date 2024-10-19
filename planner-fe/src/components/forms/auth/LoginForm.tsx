'use client';

import { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Input, Spinner, Button } from '@/components';
import { AiOutlineMail, AiOutlineLock } from 'react-icons/ai';
import { loginSchema } from '@/utils';
import { LoginFormValues } from '@/types/interfaces/loginFormValues';
import { useAuthStore } from '@/store/AuthStore';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { getToken } from '@/helpers';
import Layout from './Layout';

import styles from './forms.module.scss';

export const LoginForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    trigger,
    reset,
  } = useForm<LoginFormValues>({
    resolver: yupResolver(loginSchema),
    mode: 'onChange',
  });
  const router = useRouter();
  const token = getToken();
  const { userAuth, authenticate, isLoading, error } = useAuthStore(
    (state) => state
  );
  const [isErrorMessageShown, setIsErrorMessageShown] = useState(false);

  const onSubmit = (values: LoginFormValues) => {
    if (values) {
      authenticate(values, 'login');
      setIsErrorMessageShown(true);
    }
  };

  useEffect(() => {
    if (!error && userAuth && token) {
      router.push('/profile');
      toast.success('Вхід виконано. Ласкаво просимо!');
      reset();
    }
  }, [userAuth, error, token]);

  const handleOnFocus = (entity: 'email' | 'password') => {
    setIsErrorMessageShown(false);
    trigger(entity);
  };

  return (
    <Layout>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <Controller
          name="email"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Input
              type="email"
              label="Електронна пошта"
              placeholder="Введіть електронну пошту"
              {...field}
              icon={AiOutlineMail}
              error={errors.email?.message}
              onFocus={() => handleOnFocus('email')}
              onBlur={() => trigger('email')}
            />
          )}
        />

        <Controller
          name="password"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Input
              type="password"
              label="Пароль"
              placeholder="Введіть пароль"
              {...field}
              icon={AiOutlineLock}
              hasAbilityHideValue={true}
              error={errors.password?.message}
              onFocus={() => handleOnFocus('password')}
              onBlur={() => trigger('password')}
            />
          )}
        />
        <Button
          type="submit"
          className="buttonAuth"
          disabled={isLoading}
          name="Увійти"
        />
        {/* <button type="submit" className={styles.button} disabled={isLoading}>
          Увійти
        </button> */}
        <div className={styles.errorField}>
          {isLoading ? (
            <Spinner />
          ) : error && isErrorMessageShown ? (
            <p>{error}</p>
          ) : (
            ''
          )}
        </div>
      </form>
    </Layout>
  );
};

export default LoginForm;
