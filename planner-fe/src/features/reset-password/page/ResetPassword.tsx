'use client';

import { useForm } from 'react-hook-form';

import { useTranslations } from 'next-intl';

import { yupResolver } from '@hookform/resolvers/yup';

import { ButtonCustom } from '@/shared/components/buttons/Button';
import Input from '@/shared/components/input/Input';
import DefaultLayout from '@/shared/components/layouts/Default';
import icons from '@/shared/icons/icons';

import { resetPasswordSchema } from '@/features/reset-password/helpers/reset-password-schema';
import { useResetPassword } from '@/features/reset-password/hooks/useResetPassword';

import styles from './ResetPassword.module.scss';

type FormValues = {
  password: string;
  confirmPassword: string;
};

export const ResetPassword = () => {
  const t = useTranslations('Common');
  const schema = resetPasswordSchema(t);
  const { resetPassword, isPending, tokenExists } = useResetPassword();

  const {
    register,
    handleSubmit,
    clearErrors,
    formState: { errors, isSubmitting, isValid, dirtyFields },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
    mode: 'onChange',
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = (values: FormValues) => {
    resetPassword(values.password);
  };

  const disabledInput = isPending || isSubmitting || !tokenExists;
  const disabledButton = disabledInput || !isValid;

  return (
    <DefaultLayout>
      <div className={styles.Wrapper}>
        <h1 className={styles.Title}>{t('form.messages.resetPassword')}</h1>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.Form}>
          <Input
            {...register('password', {
              onBlur: (e) => {
                if (!e.target.value.trim()) {
                  clearErrors('password');
                }
              },
            })}
            type="password"
            label={t('form.labels.password')}
            placeholder={t('form.placeholders.newPassword')}
            icon={<icons.Home />}
            hasAbilityHideValue
            error={errors.password?.message}
            disabled={disabledInput}
            isDirty={dirtyFields.password}
          />

          <Input
            {...register('confirmPassword', {
              onBlur: (e) => {
                if (!e.target.value.trim()) {
                  clearErrors('confirmPassword');
                }
              },
            })}
            type="password"
            label={t('form.labels.confirmPassword')}
            placeholder={t('form.placeholders.confirmNewPassword')}
            icon={<icons.Home />}
            hasAbilityHideValue
            error={errors.confirmPassword?.message}
            disabled={disabledInput}
            isDirty={dirtyFields.confirmPassword}
          />

          <ButtonCustom
            disabled={disabledButton}
            name={t('buttons.update')}
            style="outlined"
            type="submit"
            onClick={handleSubmit(onSubmit)}
          />
        </form>
      </div>
    </DefaultLayout>
  );
};
