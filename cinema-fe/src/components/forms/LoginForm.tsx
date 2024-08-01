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
import { LoginFormValues } from '@/types/interfaces/loginFormValues';
import { useHandleLogin } from '@/hooks/useHandleLogin';
import Spinner from '../spinner/Spinner';
import { responseError } from '@/utils';
const LoginForm = () => {
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

  const { setFormValues, isLoading, error } = useHandleLogin();
  const [isErroMessageshown, setIsErrorMessageShown] = useState(false);

  const onSubmit = (values: LoginFormValues) => {
    setFormValues(values);
    reset(values);
    setIsErrorMessageShown(true);
  };

  const handleOnFocus = (entity: 'email' | 'password') => {
    setIsErrorMessageShown(false);
    trigger(entity);
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
              label="Password"
              placeholder="Enter your password"
              {...field}
              icon={AiOutlineLock}
              hasAbilityHideValue={true}
              error={errors.password?.message}
              onFocus={() => handleOnFocus('password')}
              onBlur={() => trigger('password')}
            />
          )}
        />
        <div className={styles.errorField}>
          {isLoading ? (
            <Spinner />
          ) : error && isErroMessageshown ? (
            <p>{responseError(error)}</p>
          ) : (
            ''
          )}
        </div>
        <button type="submit" className={styles.button} disabled={isLoading}>
          Log In
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
