'use client';

import DefaultLayout from '@/shared/components/layouts/Default';
import { ErrorMessage } from '@/shared/components/ui/errorMessage/ErrorMessage';

const ServerError = () => {
  return (
    <DefaultLayout>
      <ErrorMessage message="500 | Internal Server Error" />
    </DefaultLayout>
  );
};

export default ServerError;
