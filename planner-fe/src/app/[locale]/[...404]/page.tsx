import { ErrorMessage } from '@/shared/components/ui/errorMessage/ErrorMessage';
import { Metadata } from 'next';
import DefaultLayout from '@/shared/components/layouts/Default';

export const metadata: Metadata = {
  title: '404 | Page Not Found',
};

const Custom404 = () => {
  return (
    <DefaultLayout>
      <ErrorMessage message="404 | Page Not Found" />
    </DefaultLayout>
  );
};

export default Custom404;
