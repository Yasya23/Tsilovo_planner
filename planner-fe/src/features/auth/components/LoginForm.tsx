'use client';

import { useForm } from 'react-hook-form';

import { useTranslations } from 'next-intl';

import { yupResolver } from '@hookform/resolvers/yup';

import { ButtonCustom } from '@/shared/components/buttons/Button';
import Input from '@/shared/components/input/Input';
import { routes } from '@/shared/constants/routes';
import icons from '@/shared/icons/icons';

import styles from '@/features/auth/components/AuthForm.module.scss';
import { createLoginSchema } from '@/features/auth/helpers/login-schema';

type LoginFormValues = {
  email: string;
  password: string;
};

type LoginFormValuesProps = {
  isPending: boolean;
  login: (data: LoginFormValues) => void;
};

export const LoginForm = ({ isPending, login }: LoginFormValuesProps) => {
  const t = useTranslations('Common');
  const schema = createLoginSchema(t);

  const {
    register,
    handleSubmit,
    clearErrors,
    formState: { errors, isSubmitting, isValid, dirtyFields },
  } = useForm<LoginFormValues>({
    resolver: yupResolver(schema),
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (values: LoginFormValues) => {
    login(values);
  };

  const disabledInput = isPending || isSubmitting;
  const disabledButton = disabledInput || !isValid;

  return (
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
          label={t('form.labels.email')}
          placeholder={t('form.placeholders.email')}
          icon={<icons.Mail />}
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
          name={t('buttons.signIn')}
          style="outlined"
          type="submit"
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
