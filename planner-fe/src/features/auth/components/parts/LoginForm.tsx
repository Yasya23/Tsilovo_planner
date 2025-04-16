'use client';

import { Controller, useForm } from 'react-hook-form';

import { useTranslations } from 'next-intl';

import { yupResolver } from '@hookform/resolvers/yup';

import ButtonCustom from '@/shared/components/ui/buttons/Button';
import Input from '@/shared/components/ui/input/Input';
import { routes } from '@/shared/constants/routes';
import icons from '@/shared/icons/icons';
import { User } from '@/shared/types/user.type';
import { createLoginSchema } from '@/shared/utils/validation/login-schema';

import styles from '@/features/auth/components/AuthForm.module.scss';

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
  isPending,
  error,
  login,
}: LoginFormValuesProps) => {
  const t = useTranslations('Common');
  const schema = createLoginSchema(t);

  const {
    control,
    handleSubmit,
    clearErrors,
    trigger,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: schema ? yupResolver(schema) : undefined,
    mode: 'onChange',
  });

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
      </fieldset>
    </form>
  );
};

export default LoginForm;
