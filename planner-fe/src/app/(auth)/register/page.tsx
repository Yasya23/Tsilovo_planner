import { Metadata } from 'next';
import { RegistrationForm } from '@/components/forms';

export const metadata: Metadata = {
  title: 'Register',
};

export default function Page() {
  return (
    <>
      <RegistrationForm />
    </>
  );
}
