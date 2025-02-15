import AuthForm from '@/components/forms/auth/AuthForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Register',
};

export default function Page() {
  return <AuthForm mode="register" />;
}
