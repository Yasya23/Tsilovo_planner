'use client';

import { MessageWithToMainLink } from '@/components/responseMessages';

const ServerError = () => {
  return <MessageWithToMainLink message="500 | Internal Server Error" />;
};

export default ServerError;
