'use client';

import { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Spinner } from '@/components/spinner/Spinner';
import { Input } from '@/components/input/Input';
import { Checkbox } from '@/components/checkbox/Checkbox';
import { updateInfoSchema } from '@/utils';
import { useAuthStore } from '@/store/AuthStore';
import { getToken } from '@/helpers';
import { AiOutlineLock, AiOutlineMail } from 'react-icons/ai';
import styles from './forms.module.scss';
import toast from 'react-hot-toast';
import { LoginFormValues } from '@/types/interfaces/loginFormValues';
import classNames from 'classnames';

interface FormValues extends LoginFormValues {
  newPassword?: string;
  confirmNewPassword?: string;
  newPasswordCheckbox?: boolean;
}

export const UpdateInfo = () => {
  const {
    control,
    handleSubmit,
    clearErrors,
    setError,
    formState: { errors },
    reset,
    trigger,
    watch,
    resetField,
  } = useForm<FormValues>({
    resolver: yupResolver(updateInfoSchema),
    mode: 'onChange',
  });
  const { userAuth, authenticate, isLoading, error } = useAuthStore(
    (state) => state
  );
  const newPassword = watch('newPassword');
  const email = watch('email');
  const isChecked = watch('newPasswordCheckbox');
  const token = getToken();

  const isSubmitDisabled = email !== userAuth?.email || isChecked || isLoading;

  const onSubmit = (values: FormValues) => {
    const { email, password } = values;
    const userEmail = email && userAuth ? email : userAuth?.email;
    if (values && userEmail) {
      authenticate(
        {
          email: userEmail,
          password,
          newPassword,
        },
        'update'
      );
    }
    if (error) {
      setError('root.serverError', {
        type: 'custom',
        message: error,
      });
    } else {
      toast.success('Змінено Успішно!');
      reset();
      clearErrors();
    }
  };

  const handleOnFocus = (entity: 'email' | 'password' | 'newPassword') => {
    trigger(entity);
    clearErrors('root.serviceError');
  };

  useEffect(() => {
    trigger('confirmNewPassword');
  }, [newPassword, trigger]);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <Controller
          name="email"
          control={control}
          defaultValue={userAuth?.email}
          render={({ field }) => (
            <Input
              type="email"
              label="Електронна пошта/нова пошта"
              placeholder="Введіть електронну пошту"
              {...field}
              icon={AiOutlineMail}
              error={errors.email?.message}
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
              label="Пароль"
              placeholder="Введіть пароль"
              {...field}
              icon={AiOutlineLock}
              hasAbilityHideValue={true}
              error={errors?.password?.message}
              onFocus={() => handleOnFocus('password')}
              onBlur={() => trigger('password')}
            />
          )}
        />

        <Controller
          name="newPasswordCheckbox"
          control={control}
          defaultValue={false}
          render={({ field: { value, onChange } }) => (
            <label className={styles.checkbox}>
              <Checkbox
                isCompleted={!!value}
                isDisabled={false}
                handleCheckboxChange={() => {
                  onChange(!value);
                  if (!!value) {
                    resetField('newPassword');
                    resetField('confirmNewPassword');
                  }
                }}
              />
              <span>Я хочу змінити пароль</span>
            </label>
          )}
        />

        <div className={!isChecked ? styles.notEditable : ''}>
          <Controller
            name="newPassword"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <Input
                type="newPassword"
                label="Новий пароль"
                placeholder="Введіть новий пароль"
                {...field}
                value={field.value ?? ''}
                icon={AiOutlineLock}
                hasAbilityHideValue={true}
                error={errors?.newPassword?.message}
                onFocus={() => handleOnFocus('newPassword')}
                onBlur={() => trigger('newPassword')}
                disabled={!isChecked}
              />
            )}
          />

          <Controller
            name="confirmNewPassword"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <Input
                type="password"
                label="Підтвердіть пароль"
                placeholder="Підтвердіть пароль"
                {...field}
                value={field.value ?? ''}
                icon={AiOutlineLock}
                hasAbilityHideValue={true}
                error={errors?.confirmNewPassword?.message}
                onFocus={() => trigger('confirmNewPassword')}
                onBlur={() => trigger('confirmNewPassword')}
                disabled={!isChecked}
              />
            )}
          />
        </div>
        <button
          type="submit"
          className={classNames(styles.button, styles.rounded)}
          disabled={!isSubmitDisabled}>
          Оновити
        </button>
        <div className={styles.errorField}>
          {isLoading ? <Spinner /> : errors.root?.serverError?.message}
        </div>
      </form>
    </>
  );
};
