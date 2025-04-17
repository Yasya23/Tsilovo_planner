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
import { createRegistrationSchema } from '@/shared/utils';

import styles from '@/features/auth/components/AuthForm.module.scss';

type RegisterFormValues = {
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
};

type ChangePasswordsProps = {
  user: User | null | undefined;
  isPending: boolean;
  error: Error | null;
  register: (data: RegisterFormValues) => void;
};

export const ChangePassword = ({
  isPending,
  error,
  register,
}: ChangePasswordsProps) => {
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

  const password = watch('newPassword');

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
          name="oldPassword"
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
          name="newPassword"
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
              error={getError('newPassword')}
              serverError={!!error}
              onFocus={() => handleOnFocus('newPassword')}
              onBlur={() => trigger('newPassword')}
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
          name={t('buttons.update')}
          style="outlined"
          onClick={handleSubmit(onSubmit)}
        />
      </fieldset>
    </form>
  );
};
