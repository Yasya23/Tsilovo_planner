import { Metadata } from 'next';

import { ErrorMessage } from '@/shared/components/error-message/ErrorMessage';
import { DefaultLayout } from '@/shared/components/layouts/Default';

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
