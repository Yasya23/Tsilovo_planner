'use client';

import DefaultLayout from '@/shared/components/layouts/Default';

import { MessageNavigator } from '@/shared/components/messageNavigator/MessageNavigator';

const ServerError = () => {
  return (
    <DefaultLayout>
      <MessageNavigator message="500 | Internal Server Error" />
    </DefaultLayout>
  );
};

export default ServerError;
