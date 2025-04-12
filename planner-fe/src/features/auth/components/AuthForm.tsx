'use client';

import { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { FcGoogle } from 'react-icons/fc';

import Spinner from '@/shared/components/ui/Spinner';
import Input from '@/shared/components/ui/input/Input';
import ButtonCustom from '@/shared/components/ui/buttons/Button';
import { AiOutlineMail, AiOutlineLock, AiOutlineUser } from 'react-icons/ai';

import { loginSchema, registrationSchema } from '@/shared/utils';
import { useAuthStore } from '@/shared/store/AuthStore';
import { getToken } from '@/shared/helpers';
import { routes } from '@/shared/constants/routes';
import { useLocale } from 'next-intl';
import styles from './index.module.scss';
import { AuthService } from '@/shared/services/auth.service';

type LoginFormValues = {
  email: string;
  password: string;
};

type RegisterFormValues = LoginFormValues & {
  name: string;
  confirmPassword: string;
};

type AuthFormProps = {
  mode: 'login' | 'register';
};

export const AuthForm = ({ mode }: AuthFormProps) => {
  const locale = useLocale();
  const isRegister = mode === 'register';

  const {
    control,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
    reset,
    trigger,
    watch,
  } = useForm<LoginFormValues | RegisterFormValues>({
    resolver: yupResolver(isRegister ? registrationSchema : loginSchema),
    mode: 'onChange',
  });

  const router = useRouter();
  const token = getToken();
  const { userAuth, authenticate, isPending, error } = useAuthStore(
    (state) => state
  );

  const password = watch('password');

  if (isRegister && password) {
    trigger('confirmPassword');
  }

  // useEffect(() => {
  //   if (isRegister && password) {
  //     trigger('confirmPassword');
  //   }
  // }, [password, trigger, isRegister]);

  useEffect(() => {
    if (error) {
      setError('root.serverError', {
        type: 'custom',
        message: error,
      });
    } else if (userAuth && token) {
      router.push(`/${locale}/${routes.planner}`);
      toast.success(
        isRegister ? 'Реєстрація успішна!' : 'Вхід виконано. Ласкаво просимо!'
      );
      reset();
      clearErrors();
    }
  }, [userAuth, error, setError, isRegister]);

  const handleOnFocus = (
    entity: 'email' | 'password' | 'name' | 'confirmPassword'
  ) => {
    trigger(entity);
    clearErrors('root.serviceError');
  };

  const getError = (name: keyof RegisterFormValues | keyof LoginFormValues) => {
    return errors?.[name as keyof typeof errors]?.message || undefined;
  };

  const onSubmit = (values: LoginFormValues | RegisterFormValues) => {
    authenticate(values, isRegister ? 'register' : 'login');
  };

  const handleGoogleLogin = () => {
    AuthService.googleAuth();
  };

  return (
    <div className={styles.Wrapper}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.Form}>
        <div className={styles.googleButton} onClick={handleGoogleLogin}>
          <FcGoogle size={24} />
          <span>Continue with Google</span>
        </div>

        <div className={styles.divider}>
          <span>or</span>
        </div>

        {isRegister && (
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
                error={getError('name')}
                onFocus={() => handleOnFocus('name')}
                onBlur={() => trigger('name')}
              />
            )}
          />
        )}

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
              label="Пароль"
              placeholder="Введіть пароль"
              {...field}
              icon={AiOutlineLock}
              hasAbilityHideValue={true}
              error={getError('password')}
              onFocus={() => handleOnFocus('password')}
              onBlur={() => trigger('password')}
            />
          )}
        />

        {isRegister && (
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
                error={getError('confirmPassword')}
                onFocus={() => handleOnFocus('confirmPassword')}
                onBlur={() => trigger('confirmPassword')}
              />
            )}
          />
        )}

        <ButtonCustom
          disabled={isPending}
          name={isRegister ? 'Реєстрація' : 'Увійти'}
          style="outlined"
          onClick={handleSubmit(onSubmit)}
        />

        {isRegister ? (
          <div>
            Вже зареєстровані?
            <ButtonCustom href={routes.login} name="Увійти" style="text" />
          </div>
        ) : (
          <div>
            Ще не зареєстровані?
            <ButtonCustom
              href={routes.register}
              name="Зареєструватися"
              style="text"
            />
          </div>
        )}

        <div className={styles.Error}>
          {isPending ? <Spinner /> : errors.root?.serverError?.message}
        </div>
      </form>
    </div>
  );
};

export default AuthForm;
