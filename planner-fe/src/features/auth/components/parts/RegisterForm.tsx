// RegisterForm.tsx
'use client';

import { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { AiOutlineMail, AiOutlineLock, AiOutlineUser } from 'react-icons/ai';

import Input from '@/shared/components/ui/input/Input';
import ButtonCustom from '@/shared/components/ui/buttons/Button';
import { FormError } from '@/features/auth/components/parts/error/Error';

import { registrationSchema } from '@/shared/utils';
import { routes } from '@/shared/constants/routes';
import { User } from '@/shared/types/user.type';
import styles from '@/features/auth/components/AuthForm.module.scss';
type RegisterFormValues = {
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
};

type RegisterFormValuesProps = {
  user: User | null | undefined;
  isPending: boolean;
  error: Error | null;
  register: (data: RegisterFormValues) => void;
};

export const RegisterForm = ({
  user,
  isPending,
  error,
  register,
}: RegisterFormValuesProps) => {
  const {
    control,
    handleSubmit,
    setError,
    clearErrors,
    trigger,
    formState: { errors },
    watch,
    reset,
  } = useForm<RegisterFormValues>({
    resolver: yupResolver(registrationSchema),
    mode: 'onChange',
  });

  const password = watch('password');

  useEffect(() => {
    if (password) {
      trigger('confirmPassword');
    }
  }, [password, trigger]);

  useEffect(() => {
    if (user) {
      reset();
      clearErrors();
    } else if (error) {
      setError('root.serverError', {
        type: 'custom',
        message: `${error}`,
      });
    }
  }, [user, error, reset, clearErrors, setError]);

  const getError = (name: keyof RegisterFormValues) => {
    return errors?.[name]?.message || undefined;
  };

  const onSubmit = (values: RegisterFormValues) => {
    register(values);
  };

  const handleOnFocus = (field: keyof RegisterFormValues) => {
    trigger(field);
    clearErrors('root.serverError');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.Form}>
      <Controller
        name="name"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <Input
            type="text"
            label="Імʼя"
            placeholder="Введіть імʼя"
            {...field}
            icon={AiOutlineUser}
            error={getError('name')}
            onFocus={() => handleOnFocus('name')}
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
            label="Електронна пошта"
            placeholder="Введіть електронну пошту"
            {...field}
            icon={AiOutlineMail}
            error={getError('email')}
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
            hasAbilityHideValue
            error={getError('password')}
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
            hasAbilityHideValue
            error={getError('confirmPassword')}
            onFocus={() => handleOnFocus('confirmPassword')}
            onBlur={() => trigger('confirmPassword')}
          />
        )}
      />

      <ButtonCustom
        disabled={isPending}
        name="Реєстрація"
        style="outlined"
        onClick={handleSubmit(onSubmit)}
      />

      <div>
        Вже зареєстровані?
        <ButtonCustom href={routes.login} name="Увійти" style="text" />
      </div>

      <FormError
        isPending={isPending}
        error={errors.root?.serverError?.message}
      />
    </form>
  );
};

export default RegisterForm;
