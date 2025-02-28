import AuthPage from '@/pages/auth';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Register',
};

export default function Page() {
  return <AuthPage mode="register" />;
}
