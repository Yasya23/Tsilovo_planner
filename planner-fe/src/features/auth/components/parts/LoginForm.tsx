// LoginForm.tsx
'use client';

import { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { AiOutlineMail, AiOutlineLock } from 'react-icons/ai';

import Input from '@/shared/components/ui/input/Input';
import ButtonCustom from '@/shared/components/ui/buttons/Button';
import FormError from '@/features/auth/components/parts/error/Error';
import { responseError } from '@/shared/utils';
import { loginSchema } from '@/shared/utils';
import { routes } from '@/shared/constants/routes';
import styles from '@/features/auth/components/AuthForm.module.scss';
import { User } from '@/shared/types/user.type';
type LoginFormValues = {
  email: string;
  password: string;
};

type LoginFormValuesProps = {
  user: User | null | undefined;
  isPending: boolean;
  error: Error | null;
  login: (data: LoginFormValues) => void;
};

export const LoginForm = ({
  user,
  isPending,
  error,
  login,
}: LoginFormValuesProps) => {
  const {
    control,
    handleSubmit,
    setError,
    clearErrors,
    trigger,
    formState: { errors },
    reset,
  } = useForm<LoginFormValues>({
    resolver: yupResolver(loginSchema),
    mode: 'onChange',
  });

  useEffect(() => {
    if (user) {
      reset();
      clearErrors();
    } else if (error) {
      setError('root.serverError', {
        type: 'custom',
        message: responseError(error),
      });
    }
  }, [user, error, reset, clearErrors, setError]);

  const getError = (name: keyof LoginFormValues) => {
    return errors?.[name]?.message || undefined;
  };

  const onSubmit = (values: LoginFormValues) => {
    login(values);
  };

  const handleOnFocus = (field: keyof LoginFormValues) => {
    trigger(field);
    clearErrors('root.serverError');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.Form}>
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

      <ButtonCustom
        disabled={isPending}
        name="Увійти"
        style="outlined"
        onClick={handleSubmit(onSubmit)}
      />

      <div>
        Ще не зареєстровані?
        <ButtonCustom
          href={routes.register}
          name="Зареєструватися"
          style="text"
        />
      </div>

      <FormError
        isPending={isPending}
        error={errors.root?.serverError?.message}
      />
    </form>
  );
};

export default LoginForm;
