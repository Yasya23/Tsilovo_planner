'use client';

import { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Spinner } from '@/shared/components/ui/Spinner';
import { Input } from '@/shared/components/ui/input/Input';
import CheckboxCustom from '@/shared/components/ui/checkbox';
import { updateInfoSchema } from '@/shared/utils';
import { useAuthStore } from '@/shared/store/AuthStore';
import { getToken } from '@/shared/helpers';
import { AiOutlineLock, AiOutlineMail } from 'react-icons/ai';
import ButtonCustom from '../ui/buttons/Button';
import toast from 'react-hot-toast';
import { LoginFormValues } from '@/shared/types/interfaces/loginFormValues';
import classNames from 'classnames';
import styles from './UpdateInfo.module.scss';
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

  return <form></form>;
};
