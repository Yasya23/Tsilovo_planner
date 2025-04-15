import AuthForm from '@/features/auth/components/AuthForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Login',
};

export default function Page() {
  return <AuthForm mode="login" />;
}
