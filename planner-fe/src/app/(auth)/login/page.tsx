import { LoginForm } from '@/components/forms/auth/LoginForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Login',
};

export default function Page() {
  return (
    <>
      <LoginForm />
    </>
  );
}
