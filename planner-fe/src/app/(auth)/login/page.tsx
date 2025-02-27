import AuthPage from '@/pages/auth';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Login',
};

export default function Page() {
  return <AuthPage mode="login" />;
}
