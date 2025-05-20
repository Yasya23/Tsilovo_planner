'use client';

import { useForm } from 'react-hook-form';

import { useTranslations } from 'next-intl';

import { yupResolver } from '@hookform/resolvers/yup';

import { ButtonCustom } from '@/shared/components/buttons/Button';
import Input from '@/shared/components/input/Input';
import icons from '@/shared/icons/icons';

import { createEmailSchema } from '@/features/settings/helpers/update-email-schema';

import styles from './ChangeData.module.scss';

type FormValues = {
  email: string;
  password: string;
};

type ChangeEmailProps = {
  email: string;
  isPending: boolean;
  updateEmail: (data: FormValues) => void;
};

export const ChangeEmail = ({
  email,
  isPending,
  updateEmail,
}: ChangeEmailProps) => {
  const t = useTranslations('Common');
  const updateEmailSchema = createEmailSchema(t);

  const {
    register,
    handleSubmit,
    clearErrors,
    formState: { errors, isSubmitting, dirtyFields, isValid },
  } = useForm<FormValues>({
    resolver: yupResolver(updateEmailSchema),
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (values: FormValues) => {
    updateEmail(values);
  };

  const disabledInput = isPending || isSubmitting;
  const disabledButton = disabledInput || !isValid;

  return (
    <div className={styles.Wrapper}>
      <h2 className={styles.Title}>{t('settings.changeEmail')}</h2>
      <p className={styles.OldData}>
        {t('form.labels.email')} : {email}
      </p>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.Form}>
        <fieldset disabled={isPending}>
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
        </fieldset>
      </form>
    </div>
  );
};
