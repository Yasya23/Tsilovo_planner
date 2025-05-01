'use client';

import { Controller, useForm } from 'react-hook-form';

import { useTranslations } from 'next-intl';

import { yupResolver } from '@hookform/resolvers/yup';

import { ButtonCustom } from '@/shared/components/ui/buttons/Button';
import Input from '@/shared/components/ui/input/Input';
import icons from '@/shared/icons/icons';

import { createEmailSchema } from '@/features/settings/helpers/update-email-schema';

import styles from './ChangeEmail.module.scss';

type FormValues = {
  email: string;
};

type ChangeEmailProps = {
  isPending: boolean;
  error: Error | null;
  updateEmail: (data: FormValues) => void;
};

export const ChangeEmail = ({
  isPending,
  error,
  updateEmail,
}: ChangeEmailProps) => {
  const t = useTranslations('Common');
  const updateEmailSchema = createEmailSchema(t);

  const {
    control,
    handleSubmit,
    trigger,
    formState: { errors },
    watch,
  } = useForm<FormValues>({
    resolver: yupResolver(updateEmailSchema),
    mode: 'onChange',
  });

  const getError = (name: keyof FormValues) => {
    return errors?.[name]?.message || undefined;
  };

  const onSubmit = (values: FormValues) => {
    updateEmail(values);
  };

  const handleOnFocus = (field: keyof FormValues) => {
    trigger(field);
  };

  return (
    <div className={styles.Wrapper}>
      <h2 className={styles.Title}>{t('settings.changeEmail')}</h2>
      <Input
        type="email"
        value={''}
        label={t('form.labels.email')}
        placeholder={t('form.placeholders.email')}
        icon={<icons.Home />}
        hasAbilityHideValue
        error={getError('email')}
        onChange={() => {}}
        disabled={!!isPending}
      />
      <form onSubmit={handleSubmit(onSubmit)} className={styles.Form}>
        <fieldset disabled={isPending}>
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
                hasAbilityHideValue
                error={getError('email')}
                serverError={!!error}
                onFocus={() => handleOnFocus('email')}
                onBlur={() => trigger('email')}
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
