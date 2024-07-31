'use client';

import { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Input from '../input/Input';
import Link from 'next/link';
import { registrationSchema } from '@/utils';

import { AiOutlineMail, AiOutlineLock, AiOutlineUser } from 'react-icons/ai';
import styles from './forms.module.scss';
import classNames from 'classnames';

interface RegistrationFormValues {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const RegistrationForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    trigger,
    watch,
  } = useForm<RegistrationFormValues>({
    resolver: yupResolver(registrationSchema),
    mode: 'onChange',
  });
  const [isLoading, setIsLoading] = useState(false);

  const password = watch('password');

  useEffect(() => {
    trigger('confirmPassword');
  }, [password, trigger]);

  const onSubmit = (values: RegistrationFormValues) => {
    setIsLoading(true);
    console.log(values);
    setIsLoading(false);
    reset();
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.switchPage}>
        <Link href="/login" className={styles.button}>
          To Login Page
        </Link>
        <div className={classNames(styles.button, styles.disabled)}>
          Register Page
        </div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <Controller
          name="username"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Input
              type="text"
              label="Username"
              placeholder="Enter your username"
              {...field}
              icon={AiOutlineUser}
              error={errors?.username?.message}
              onFocus={() => trigger('username')}
              onBlur={() => trigger('username')}
            />
          )}
        />

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

        <Controller
          name="confirmPassword"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Input
              type="password"
              label="Confirm Password"
              placeholder="Confirm your password"
              {...field}
              icon={AiOutlineLock}
              hasAbilityHideValue={true}
              error={errors?.confirmPassword?.message}
              onFocus={() => trigger('confirmPassword')}
              onBlur={() => trigger('confirmPassword')}
            />
          )}
        />

        <button type="submit" className={styles.button} disabled={isLoading}>
          Register
        </button>
      </form>
    </div>
  );
};

export default RegistrationForm;
