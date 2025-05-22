'use client';

import { useForm } from 'react-hook-form';

import { useTranslations } from 'next-intl';

import { yupResolver } from '@hookform/resolvers/yup';

import { ButtonCustom } from '@/shared/components/buttons/Button';
import Input from '@/shared/components/input/Input';
import DefaultLayout from '@/shared/components/layouts/Default';
import icons from '@/shared/icons/icons';

import { checkEmailSchema } from '@/features/forgot-password/helpers/email-schema';

import { useRestorePassword } from '../hooks/useForgotPassword';
import styles from './ForgotPassword.module.scss';

type FormValues = {
  email: string;
};

export const ForgotPassword = () => {
  const t = useTranslations('Common');
  const schema = checkEmailSchema(t);
  const { restorePassword, isPending } = useRestorePassword();

  const {
    register,
    handleSubmit,
    clearErrors,
    formState: { errors, isSubmitting, isValid, dirtyFields },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
    mode: 'onChange',
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = (values: FormValues) => {
    restorePassword(values);
  };

  const disabledInput = isPending || isSubmitting;
  const disabledButton = disabledInput || !isValid;

  return (
    <DefaultLayout>
      <div className={styles.Wrapper}>
        <h1 className={styles.Title}>{t('form.messages.forgotPassword')}</h1>
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
            label={t('form.labels.email')}
            placeholder={t('form.placeholders.email')}
            icon={<icons.Mail />}
            error={errors.email?.message}
            isDirty={dirtyFields.email}
            disabled={disabledInput}
          />

          <ButtonCustom
            disabled={disabledButton}
            name={t('buttons.restorePassword')}
            style="outlined"
            type="submit"
            onClick={handleSubmit(onSubmit)}
          />
        </form>
      </div>
    </DefaultLayout>
  );
};
