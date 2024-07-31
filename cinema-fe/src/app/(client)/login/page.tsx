import LoginForm from '@/components/forms/LoginForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Login',
};

const page = () => {
  return (
    <>
      <LoginForm />
    </>
  );
};

export default page;
