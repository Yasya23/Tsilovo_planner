'use client';

import { MessageNavigator } from '@/shared/components/messageNavigator/MessageNavigator';

const ServerError = () => {
  return <MessageNavigator message="500 | Internal Server Error" />;
};

export default ServerError;
