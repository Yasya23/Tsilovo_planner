import { useState, useEffect } from 'react';
import { useLogin } from '@/hooks/useAuth';
import { LoginFormValues } from '@/types/interfaces/loginFormValues';
import { saveUserWhenAuth } from '@/helpers';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export const useHandleLogin = () => {
  const [formValues, setFormValues] = useState<LoginFormValues>({
    email: '',
    password: '',
  });
  const { data, error, refetch, isSuccess, isLoading } = useLogin(formValues);
  const router = useRouter();

  useEffect(() => {
    const updateData = async () => {
      await refetch();
      if (isSuccess && data?.data) {
        saveUserWhenAuth(data.data);
      }
    };

    if (formValues.email && formValues.password) {
      updateData();
    }
  }, [formValues]);

  useEffect(() => {
    if (isSuccess) {
      router.push('/');
      toast.success('You are sign in');
    }
  }, [isSuccess]);

  return { setFormValues, isLoading, error };
};
