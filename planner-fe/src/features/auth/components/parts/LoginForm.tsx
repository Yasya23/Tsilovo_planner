// LoginForm.tsx
'use client';

import { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { AiOutlineMail, AiOutlineLock } from 'react-icons/ai';
import { useTranslations, useLocale } from 'next-intl';
import * as yup from 'yup';

import Input from '@/shared/components/ui/input/Input';
import ButtonCustom from '@/shared/components/ui/buttons/Button';
import FormError from '@/features/auth/components/parts/error/Error';
import { responseError } from '@/shared/utils';
import { createLoginSchema } from '@/shared/utils/validation/login-schema';
import { routes } from '@/shared/constants/routes';
import styles from '@/features/auth/components/AuthForm.module.scss';
import { User } from '@/shared/types/user.type';

type LoginFormValues = {
  email: string;
  password: string;
};

type LoginFormValuesProps = {
  user: User | null | undefined;
  isPending: boolean;
  error: Error | null;
  login: (data: LoginFormValues) => void;
};

export const LoginForm = ({
  user,
  isPending,
  error,
  login,
}: LoginFormValuesProps) => {
  const t = useTranslations('Common');
  const locale = useLocale();
  const [schema, setSchema] = useState<yup.ObjectSchema<any>>();

  useEffect(() => {
    const initSchema = async () => {
      const newSchema = await createLoginSchema(locale);
      setSchema(newSchema);
    };
    initSchema();
  }, [locale]);

  const {
    control,
    handleSubmit,
    setError,
    clearErrors,
    trigger,
    formState: { errors },
    reset,
  } = useForm<LoginFormValues>({
    resolver: schema ? yupResolver(schema) : undefined,
    mode: 'onChange',
  });

  useEffect(() => {
    if (user) {
      reset();
      clearErrors();
    } else if (error) {
      setError('root.serverError', {
        type: 'custom',
        message: responseError(error),
      });
    }
  }, [user, error, reset, clearErrors, setError]);

  const getError = (name: keyof LoginFormValues) => {
    return errors?.[name]?.message || undefined;
  };

  const onSubmit = (values: LoginFormValues) => {
    login(values);
  };

  const handleOnFocus = (field: keyof LoginFormValues) => {
    trigger(field);
    clearErrors('root.serverError');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.Form}>
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
            onFocus={() => handleOnFocus('password')}
            onBlur={() => trigger('password')}
          />
        )}
      />

      <ButtonCustom
        disabled={isPending}
        name={t('buttons.signIn')}
        style="outlined"
        onClick={handleSubmit(onSubmit)}
      />

      <div>
        {t('form.messages.notRegistered')}
        <ButtonCustom
          href={routes.register}
          name={t('buttons.register')}
          style="text"
        />
      </div>

      <FormError
        isPending={isPending}
        error={errors.root?.serverError?.message}
      />
    </form>
  );
};

export default LoginForm;
