'use client';

import { ErrorMessage } from '@/shared/components/error-message/ErrorMessage';
import DefaultLayout from '@/shared/components/layouts/Default';

const ServerError = () => {
  return (
    <DefaultLayout>
      <ErrorMessage message="500 | Internal Server Error" />
    </DefaultLayout>
  );
};

export default ServerError;
