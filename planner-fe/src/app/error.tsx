'use client';

import { MessageNavigator } from '@/components/MessageNavigator/MessageNavigator';

const ServerError = () => {
  return <MessageNavigator message="500 | Internal Server Error" />;
};

export default ServerError;
