'use client';

import { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Spinner } from '@/components/spinner/Spinner';
import { Input } from '@/components/input/Input';
import { Button } from '@/components/buttons/button/Button';
import { AiOutlineMail, AiOutlineLock } from 'react-icons/ai';
import { loginSchema } from '@/utils';
import { LoginFormValues } from '@/types/interfaces/loginFormValues';
import { useAuthStore } from '@/store/AuthStore';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { getToken } from '@/helpers';
import Layout from './Layout';
import { routes } from '@/constants/routes';

import styles from './forms.module.scss';

export const LoginForm = () => {
  const {
    control,
    handleSubmit,
    setError,
    clearErrors,
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

  const onSubmit = (values: LoginFormValues) => {
    if (values) {
      authenticate(values, 'login');
    }
  };

  useEffect(() => {
    if (error) {
      setError('root.serverError', {
        type: 'custom',
        message: error,
      });
    } else if (userAuth && token) {
      router.push(routes.planner);
      toast.success('Вхід виконано. Ласкаво просимо!');
      reset();
    }
  }, [userAuth, error, token, setError]);

  const handleOnFocus = (entity: 'email' | 'password') => {
    trigger(entity);
    clearErrors('root.serviceError');
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
        <div className={styles.errorField}>
          {isLoading ? <Spinner /> : errors.root?.serverError?.message}
        </div>
      </form>
    </Layout>
  );
};
