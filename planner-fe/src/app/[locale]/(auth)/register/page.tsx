import { Metadata } from 'next';

import AuthForm from '@/features/auth/page/AuthForm';

export const metadata: Metadata = {
  title: 'Register',
};

export default function Page() {
  return <AuthForm mode="register" />;
}
