'use client';

import { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Input from '@/components/input/Input';
import { updateInfoSchema } from '@/utils';
import { useAuthStore } from '@/store/Store';

import { getToken } from '@/helpers';
import Spinner from '@/components/spinner/Spinner';
import { AiOutlineLock, AiOutlineMail } from 'react-icons/ai';
import styles from './forms.module.scss';
import toast from 'react-hot-toast';
import { LoginFormValues } from '@/types/interfaces/loginFormValues';

interface FormValues extends LoginFormValues {
  confirmPassword: string;
}

export const UpdateInfo = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    trigger,
    watch,
  } = useForm<FormValues>({
    resolver: yupResolver(updateInfoSchema),
    mode: 'onChange',
  });
  const password = watch('password');
  const token = getToken();
  const [successUpdate, setSuccessUpdate] = useState(false);
  const { userAuth, authenticate, isLoading, error } = useAuthStore(
    (state) => state
  );
  const [isErrorMessageShown, setIsErrorMessageShown] = useState(false);

  const onSubmit = (values: FormValues) => {
    const { email, password } = values;
    const userEmail = email && userAuth ? email : userAuth?.email;
    if (values && userEmail) {
      authenticate(
        {
          email: userEmail,
          password,
        },
        'update'
      );
    }
    setIsErrorMessageShown(true);
    if (!error && userAuth && token) {
      toast.success('Змінено успішно!');
      setSuccessUpdate(true);
      reset();
    }
  };

  const handleOnFocus = (entity: 'email' | 'password') => {
    setIsErrorMessageShown(false);
    setSuccessUpdate(false);
    trigger(entity);
  };

  useEffect(() => {
    trigger('confirmPassword');
  }, [password, trigger]);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <Controller
          name="email"
          control={control}
          defaultValue={userAuth?.email}
          render={({ field }) => (
            <Input
              type="email"
              label="Електронна пошта/нова пошта"
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
              label="Пароль/новий пароль"
              placeholder="Введіть пароль"
              {...field}
              icon={AiOutlineLock}
              hasAbilityHideValue={true}
              error={errors?.password?.message}
              onFocus={() => handleOnFocus('password')}
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
              label="Підтвердіть пароль"
              placeholder="Підтвердіть пароль"
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
          Оновити
        </button>
        <div className={styles.errorField}>
          {isLoading ? (
            <Spinner />
          ) : error && isErrorMessageShown ? (
            <p>{error}</p>
          ) : (
            successUpdate && <p>Змінено успішно!</p>
          )}
        </div>
      </form>
    </>
  );
};

export default UpdateInfo;
