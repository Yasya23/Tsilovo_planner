'use client';

import { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { AiOutlineMail, AiOutlineLock, AiOutlineUser } from 'react-icons/ai';

import Input from '@/shared/components/ui/input/Input';
import ButtonCustom from '@/shared/components/ui/buttons/Button';
import { FormError } from '@/features/auth/components/parts/error/Error';

import { createRegistrationSchema } from '@/shared/utils';
import { routes } from '@/shared/constants/routes';
import { User } from '@/shared/types/user.type';
import styles from '@/features/auth/components/AuthForm.module.scss';
import { useTranslations } from 'next-intl';
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
  const t = useTranslations('Common');
  const registrationSchema = createRegistrationSchema(t);

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
  const isServerError = !!errors?.root?.serverError?.message;

  useEffect(() => {
    if (password) {
      trigger('confirmPassword');
    }
  }, [password, trigger]);
  console.log(error);
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
  }, [error, user, clearErrors, reset, setError]);

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
      <fieldset disabled={isPending}>
        <Controller
          name="name"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Input
              type="text"
              label={t('form.labels.name')}
              placeholder={t('form.placeholders.name')}
              {...field}
              icon={AiOutlineUser}
              error={getError('name')}
              serverError={isServerError}
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
              label={t('form.labels.email')}
              placeholder={t('form.placeholders.email')}
              {...field}
              icon={AiOutlineMail}
              error={getError('email')}
              serverError={isServerError}
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
              label={t('form.labels.password')}
              placeholder={t('form.placeholders.password')}
              {...field}
              icon={AiOutlineLock}
              hasAbilityHideValue
              error={getError('password')}
              serverError={isServerError}
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
              label={t('form.labels.confirmPassword')}
              placeholder={t('form.placeholders.confirmPassword')}
              {...field}
              icon={AiOutlineLock}
              hasAbilityHideValue
              error={getError('confirmPassword')}
              serverError={isServerError}
              onFocus={() => handleOnFocus('confirmPassword')}
              onBlur={() => trigger('confirmPassword')}
            />
          )}
        />

        <ButtonCustom
          disabled={isPending}
          name={t('buttons.register')}
          style="outlined"
          onClick={handleSubmit(onSubmit)}
        />

        <div>
          {t('form.messages.alreadyRegistered')}
          <ButtonCustom
            href={routes.login}
            name={t('buttons.signIn')}
            style="text"
          />
        </div>

        <FormError
          isPending={isPending}
          error={errors.root?.serverError?.message}
        />
      </fieldset>
    </form>
  );
};

export default RegisterForm;
