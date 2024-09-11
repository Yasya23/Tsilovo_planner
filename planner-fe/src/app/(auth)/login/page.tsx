import { LoginForm } from '@/components/forms';
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
