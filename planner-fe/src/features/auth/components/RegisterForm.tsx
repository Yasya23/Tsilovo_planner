'use client';

import { useForm } from 'react-hook-form';

import { useTranslations } from 'next-intl';

import { yupResolver } from '@hookform/resolvers/yup';

import { ButtonCustom } from '@/shared/components/buttons/Button';
import Input from '@/shared/components/input/Input';
import { routes } from '@/shared/constants/routes';
import icons from '@/shared/icons/icons';

import styles from '@/features/auth/components/AuthForm.module.scss';
import { createRegistrationSchema } from '@/features/auth/helpers/registration-shema';

type RegisterFormValues = {
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
};

type RegisterFormValuesProps = {
  isPending: boolean;
  handleRegister: (data: RegisterFormValues) => void;
};

export const RegisterForm = ({
  isPending,
  handleRegister,
}: RegisterFormValuesProps) => {
  const t = useTranslations('Common');
  const registrationSchema = createRegistrationSchema(t);

  const {
    register,
    handleSubmit,
    clearErrors,
    formState: { errors, isSubmitting, isValid, dirtyFields },
  } = useForm<RegisterFormValues>({
    resolver: yupResolver(registrationSchema),
    mode: 'onChange',
  });

  const onSubmit = (values: RegisterFormValues) => {
    handleRegister(values);
  };

  const disabledInput = isPending || isSubmitting;
  const disabledButton = disabledInput || !isValid;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.Form}>
      <fieldset disabled={isPending}>
        <Input
          {...register('name', {
            onBlur: (e) => {
              if (!e.target.value.trim()) {
                clearErrors('name');
              }
            },
          })}
          type="text"
          label={t('form.labels.name')}
          placeholder={t('form.placeholders.name')}
          icon={<icons.Home />}
          hasAbilityHideValue
          error={errors.name?.message}
          isDirty={dirtyFields.name}
          disabled={disabledInput}
        />

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
          placeholder={t('form.placeholders.confirmPassword')}
          icon={<icons.Home />}
          hasAbilityHideValue
          error={errors.confirmPassword?.message}
          disabled={disabledInput}
          isDirty={dirtyFields.confirmPassword}
        />

        <ButtonCustom
          disabled={disabledButton}
          name={t('buttons.register')}
          style="outlined"
          type="submit"
          onClick={handleSubmit(onSubmit)}
        />

        <div>
          {t('form.messages.alreadyRegistered')}
          <ButtonCustom
            href={routes.login}
            name={t('buttons.signIn')}
            style="text"
          />
        </div>
      </fieldset>
    </form>
  );
};

export default RegisterForm;
