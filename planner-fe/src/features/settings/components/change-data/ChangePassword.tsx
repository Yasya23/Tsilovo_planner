'use client';

import { useForm } from 'react-hook-form';

import { useTranslations } from 'next-intl';

import { yupResolver } from '@hookform/resolvers/yup';

import { ButtonCustom } from '@/shared/components/buttons/Button';
import Input from '@/shared/components/input/Input';
import icons from '@/shared/icons/icons';

import { createUpdatePasswordSchema } from '@/features/settings/helpers/update-password-schema';

import styles from './ChangeData.module.scss';

type FormValues = {
  password: string;
  newPassword: string;
  confirmPassword: string;
};

type ChangePasswordsProps = {
  isPending: boolean;
  updatePassword: (data: FormValues) => void;
};

export const ChangePassword = ({
  isPending,
  updatePassword,
}: ChangePasswordsProps) => {
  const t = useTranslations('Common');
  const updatePasswordSchema = createUpdatePasswordSchema(t);

  const {
    register,
    handleSubmit,
    clearErrors,
    formState: { errors, dirtyFields, isValid, isSubmitting },
  } = useForm<FormValues>({
    resolver: yupResolver(updatePasswordSchema),
    mode: 'onChange',
    defaultValues: {
      password: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  const onSubmit = (values: FormValues) => {
    updatePassword(values);
  };

  const disabledInput = isPending || isSubmitting;
  const disabledButton = disabledInput || !isValid;

  console.log(errors, dirtyFields);
  return (
    <div className={styles.Wrapper}>
      <h2 className={styles.Title}>{t('settings.changePassword')}</h2>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.Form}>
        <fieldset disabled={isPending}>
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
            placeholder={t('form.placeholders.oldPassword')}
            icon={<icons.Home />}
            hasAbilityHideValue
            error={errors.password?.message}
            disabled={disabledInput}
            isDirty={dirtyFields.password}
          />

          <Input
            {...register('newPassword', {
              onBlur: (e) => {
                if (!e.target.value.trim()) {
                  clearErrors('newPassword');
                }
              },
            })}
            type="password"
            label={t('form.labels.password')}
            placeholder={t('form.placeholders.newPassword')}
            icon={<icons.Home />}
            hasAbilityHideValue
            error={errors.newPassword?.message}
            disabled={disabledInput}
            isDirty={dirtyFields.newPassword}
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
            type="submit"
            name={t('buttons.update')}
            style="outlined"
          />
        </fieldset>
      </form>
    </div>
  );
};
