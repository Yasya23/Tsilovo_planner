'use client';

import { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Input from '@/components/input/Input';
import { registrationSchema } from '@/utils';
import { useAuthStore } from '@/store/AuthStore';
import { RegisterFormValues } from '@/types/interfaces/loginFormValues';
import { getToken } from '@/helpers';
import Spinner from '@/components/spinner/Spinner';
import { useRouter } from 'next/navigation';
import { AiOutlineMail, AiOutlineLock, AiOutlineUser } from 'react-icons/ai';
import Layout from './Layout';
import styles from './forms.module.scss';
import toast from 'react-hot-toast';
import { routes } from '@/constants/routes';
interface RegistrationFormValues extends RegisterFormValues {
  confirmPassword: string;
}

export const RegistrationForm = () => {
  const {
    control,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
    reset,
    trigger,
    watch,
  } = useForm<RegistrationFormValues>({
    resolver: yupResolver(registrationSchema),
    mode: 'onChange',
  });
  const password = watch('password');
  const router = useRouter();
  const token = getToken();
  const { userAuth, authenticate, isLoading, error } = useAuthStore(
    (state) => state
  );

  const onSubmit = (values: RegistrationFormValues) => {
    const { name, email, password } = values;
    if (values) {
      authenticate(
        {
          name,
          email,
          password,
        },
        'register'
      );
    }
  };

  useEffect(() => {
    trigger('confirmPassword');
  }, [password, trigger]);

  useEffect(() => {
    if (error) {
      setError('root.serverError', {
        type: 'custom',
        message: error,
      });
    } else if (userAuth && token) {
      router.push(routes.planner);
      toast.success('Реєстрація успішна!');
      reset();
      clearErrors();
    }
  }, [userAuth, error, token, setError]);

  const handleOnFocus = (
    entity: 'email' | 'password' | 'name' | 'confirmPassword'
  ) => {
    trigger(entity);
    clearErrors('root.serviceError');
  };

  return (
    <Layout page="register">
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <Controller
          name="name"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Input
              type="text"
              label="Імʼя"
              placeholder="Введіть імʼя"
              {...field}
              icon={AiOutlineUser}
              error={errors?.name?.message}
              onFocus={() => handleOnFocus('name')}
              onBlur={() => trigger('name')}
            />
          )}
        />

        <Controller
          name="email"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Input
              type="email"
              label="Електронна пошта"
              placeholder="Введіть електронну пошту"
              {...field}
              icon={AiOutlineMail}
              error={errors?.email?.message}
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
          name="confirmPassword"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Input
              type="password"
              label="Підтвердіть пароль"
              placeholder="Підтвердіть пароль"
              {...field}
              icon={AiOutlineLock}
              hasAbilityHideValue={true}
              error={errors?.confirmPassword?.message}
              onFocus={() => handleOnFocus('confirmPassword')}
              onBlur={() => trigger('confirmPassword')}
            />
          )}
        />
        <button type="submit" className={styles.button} disabled={isLoading}>
          Реєстрація
        </button>
        <div className={styles.errorField}>
          {isLoading ? <Spinner /> : errors.root?.serverError?.message}
        </div>
      </form>
    </Layout>
  );
};
export default RegistrationForm;
