'use client';

import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { useTranslations } from 'next-intl';

import { yupResolver } from '@hookform/resolvers/yup';

import { ButtonCustom } from '@/shared/components/ui/buttons/Button';
import Input from '@/shared/components/ui/input/Input';
import icons from '@/shared/icons/icons';

import { createUpdatePasswordSchema } from '@/features/settings/helpers/update-password-schema';

import styles from './ChangePassword.module.scss';

type FormValues = {
  password: string;
  newPassword: string;
  confirmPassword: string;
};

type ChangePasswordsProps = {
  isPending: boolean;
  error: Error | null;
  updatePassword: (data: FormValues) => void;
};

export const ChangePassword = ({
  isPending,
  error,
  updatePassword,
}: ChangePasswordsProps) => {
  const t = useTranslations('Common');
  const updatePasswordSchema = createUpdatePasswordSchema(t);

  const {
    control,
    handleSubmit,
    trigger,
    formState: { errors },
    watch,
  } = useForm<FormValues>({
    resolver: yupResolver(updatePasswordSchema),
    mode: 'onChange',
  });

  const password = watch('newPassword');

  useEffect(() => {
    if (password) {
      trigger('confirmPassword');
    }
  }, [password, trigger]);

  const getError = (name: keyof FormValues) => {
    return errors?.[name]?.message || undefined;
  };

  const onSubmit = (values: FormValues) => {
    updatePassword(values);
  };

  const handleOnFocus = (field: keyof FormValues) => {
    trigger(field);
  };

  return (
    <div className={styles.Wrapper}>
      <h2 className={styles.Title}>{t('settings.changePassword')}</h2>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.Form}>
        <fieldset disabled={isPending}>
          <Controller
            name="password"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <Input
                type="password"
                label={t('form.labels.password')}
                placeholder={t('form.placeholders.oldPassword')}
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
                placeholder={t('form.placeholders.newPassword')}
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
                placeholder={t('form.placeholders.confirmNewPassword')}
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
    </div>
  );
};
