import { useQuery } from '@tanstack/react-query';
import { AuthService } from '@/services/auth.service';
import { LoginFormValues } from '@/types/interfaces/loginFormValues';

export const useLogin = ({ email, password }: LoginFormValues) => {
  const queryData = useQuery({
    queryKey: ['login', email, password],
    queryFn: () => {
      return AuthService.login({ email, password });
    },
    enabled: !!email && !!password,
    refetchOnWindowFocus: false,
    retry: false,
  });

  return queryData;
};
