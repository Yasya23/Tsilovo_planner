'use client';

import { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Input from '../input/Input';
import Link from 'next/link';
import { registrationSchema } from '@/utils';
import { routes } from '@/constants/routes';
import { useAuthStore } from '@/store/Store';
import { RegisterFormValues } from '@/types/interfaces/loginFormValues';
import { getToken } from '@/helpers';
import Spinner from '../spinner/Spinner';
import { useRouter } from 'next/navigation';
import { AiOutlineMail, AiOutlineLock, AiOutlineUser } from 'react-icons/ai';
import styles from './forms.module.scss';
import classNames from 'classnames';
import toast from 'react-hot-toast';
interface RegistrationFormValues extends RegisterFormValues {
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
  const password = watch('password');
  const router = useRouter();
  const token = getToken();

  const { userAuth, register, isLoading, error } = useAuthStore(
    (state) => state
  );
  const [isErrorMessageShown, setIsErrorMessageShown] = useState(false);

  const onSubmit = (values: RegistrationFormValues) => {
    const { name, email, password } = values;
    if (values) {
      register({
        name,
        email,
        password,
      });
      setIsErrorMessageShown(true);
    }
  };

  useEffect(() => {
    trigger('confirmPassword');
  }, [password, trigger]);

  useEffect(() => {
    if (!error && userAuth && token) {
      router.push('/');
      toast.success('You have successfully registered.');
      reset();
    }
  }, [userAuth, error, token]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.switchPage}>
        <Link href={routes.login} className={styles.button}>
          To Login Page
        </Link>
        <div className={classNames(styles.button, styles.disabled)}>
          Register Page
        </div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <Controller
          name="name"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Input
              type="text"
              label="Username"
              placeholder="Enter your username"
              {...field}
              icon={AiOutlineUser}
              error={errors?.name?.message}
              onFocus={() => trigger('name')}
              onBlur={() => trigger('name')}
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
        <div className={styles.errorField}>
          {isLoading ? (
            <Spinner />
          ) : error && isErrorMessageShown ? (
            <p>{error}</p>
          ) : (
            ''
          )}
        </div>

        <button type="submit" className={styles.button} disabled={isLoading}>
          Register
        </button>
      </form>
    </div>
  );
};

export default RegistrationForm;
