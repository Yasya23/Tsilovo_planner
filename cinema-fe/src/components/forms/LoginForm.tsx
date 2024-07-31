'use client';

import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Input from '../input/Input';
import { AiOutlineMail, AiOutlineLock } from 'react-icons/ai';
import Link from 'next/link';
import { loginSchema } from '@/utils';

import styles from './forms.module.scss';
import classNames from 'classnames';

interface LoginFormValues {
  email: string;
  password: string;
}

const LoginForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    trigger,
  } = useForm<LoginFormValues>({
    resolver: yupResolver(loginSchema),
    mode: 'onChange',
  });
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = (values: LoginFormValues) => {
    setIsLoading(true);
    console.log(values);
    setIsLoading(false);
    reset();
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.switchPage}>
        <div className={classNames(styles.button, styles.disabled)}>
          Login Page
        </div>
        <Link href="/register" className={styles.button}>
          To Register Page
        </Link>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <Controller
          name="email"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Input
              type="email"
              label="Email"
              placeholder="Enter your email"
              {...field}
              icon={AiOutlineMail}
              error={errors?.email?.message}
              onFocus={() => trigger('email')}
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
              label="Password"
              placeholder="Enter your password"
              {...field}
              icon={AiOutlineLock}
              hasAbilityHideValue={true}
              error={errors?.password?.message}
              onFocus={() => trigger('password')}
              onBlur={() => trigger('password')}
            />
          )}
        />

        <button type="submit" className={styles.button} disabled={isLoading}>
          Log In
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
