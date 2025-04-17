'use client';

import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { useTranslations } from 'next-intl';

import { yupResolver } from '@hookform/resolvers/yup';

import { ButtonCustom } from '@/shared/components/ui/buttons/Button';
import Input from '@/shared/components/ui/input/Input';
import { routes } from '@/shared/constants/routes';
import icons from '@/shared/icons/icons';
import { User } from '@/shared/types/user.type';

import styles from '@/features/auth/components/AuthForm.module.scss';
import { createRegistrationSchema } from '@/features/auth/helpers/registration-shema';

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
  isPending,
  error,
  register,
}: RegisterFormValuesProps) => {
  const t = useTranslations('Common');
  const registrationSchema = createRegistrationSchema(t);

  const {
    control,
    handleSubmit,
    clearErrors,
    trigger,
    formState: { errors },
    watch,
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
              icon={<icons.Home />}
              error={getError('name')}
              serverError={!!error}
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
              icon={<icons.Home />}
              error={getError('email')}
              serverError={!!error}
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
              icon={<icons.Home />}
              hasAbilityHideValue
              error={getError('password')}
              serverError={!!error}
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
              icon={<icons.Home />}
              hasAbilityHideValue
              error={getError('confirmPassword')}
              serverError={!!error}
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
      </fieldset>
    </form>
  );
};

export default RegisterForm;
