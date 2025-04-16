'use client';

import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
// import { useAuthStore } from '@/features/auth/hooks/AuthStore';
// import { getToken } from '@/shared/helpers';
import { AiOutlineLock, AiOutlineMail } from 'react-icons/ai';

import { yupResolver } from '@hookform/resolvers/yup';
import classNames from 'classnames';

import CheckboxCustom from '@/shared/components/ui/Checkbox';
import { Input } from '@/shared/components/ui/input/Input';
import { Spinner } from '@/shared/components/ui/Spinner';
import { LoginFormValues } from '@/shared/types/interfaces/loginFormValues';
import { updateInfoSchema } from '@/shared/utils';

import ButtonCustom from '../ui/buttons/Button';
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

  const newPassword = watch('newPassword');
  const email = watch('email');
  const isChecked = watch('newPasswordCheckbox');
  // const token = getToken();

  const isSubmitDisabled = email !== userAuth?.email || isChecked || isPending;

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
