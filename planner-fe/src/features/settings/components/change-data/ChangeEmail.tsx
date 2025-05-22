'use client';

import { useForm } from 'react-hook-form';

import { useTranslations } from 'next-intl';

import { yupResolver } from '@hookform/resolvers/yup';

import { ButtonCustom } from '@/shared/components/buttons/Button';
import Input from '@/shared/components/input/Input';
import { SkeletonLoader } from '@/shared/components/SkeletonLoader';
import icons from '@/shared/icons/icons';
import { useAuthContext } from '@/shared/providers/AuthProvider';

import { updateEmailSchema } from '@/features/settings/helpers/update-email-schema';
import { useChangeEmail } from '@/features/settings/hooks/useChangeEmail';
import { ChangeEmailType } from '@/features/settings/types/settings';

import styles from './ChangeData.module.scss';

export const ChangeEmail = () => {
  const { user, refetch } = useAuthContext();

  const t = useTranslations('Common');

  const {
    register,
    handleSubmit,
    clearErrors,
    reset,
    formState: { errors, isSubmitting, dirtyFields, isValid },
  } = useForm<ChangeEmailType>({
    resolver: yupResolver(updateEmailSchema(t)),
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const { changeEmail, isPending } = useChangeEmail(refetch, reset);

  const onSubmit = (values: ChangeEmailType) => {
    changeEmail(values);
  };

  const googleProvider = user?.provider === 'google';
  const disabledInput = isSubmitting || !user || googleProvider;
  const disabledButton = disabledInput || !isValid;

  return (
    <div className={styles.Wrapper}>
      <h2 className={styles.Title}>{t('settings.changeEmail')}</h2>
      {isPending || !user ? (
        <div className={styles.OldData}>
          <SkeletonLoader count={1} width={100} />
        </div>
      ) : (
        <p className={styles.OldData}>
          {t('form.labels.email')} : {user.email}
        </p>
      )}

      {googleProvider ? (
        <p className={styles.NotAllowedToChange}>
          {t('settings.googleProvider')}
        </p>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className={styles.Form}>
          <Input
            {...register('email', {
              onBlur: (e) => {
                if (!e.target.value.trim()) {
                  clearErrors('email');
                }
              },
            })}
            type="email"
            label={t('form.labels.newEmail')}
            placeholder={t('form.placeholders.newEmail')}
            icon={<icons.Home />}
            hasAbilityHideValue
            error={errors.email?.message}
            isDirty={dirtyFields.email}
            disabled={disabledInput}
          />

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
            placeholder={t('form.placeholders.password')}
            icon={<icons.Password />}
            hasAbilityHideValue
            error={errors.password?.message}
            isDirty={dirtyFields.password}
            disabled={disabledInput}
          />
          <ButtonCustom
            disabled={disabledButton}
            name={t('buttons.update')}
            style="outlined"
            type="submit"
            onClick={handleSubmit(onSubmit)}
          />
        </form>
      )}
    </div>
  );
};
