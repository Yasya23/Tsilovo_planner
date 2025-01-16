'use client';

import { BackToMain } from '@/components/buttons/backToMain/BackToMain';

const ServerError = () => {
  return <BackToMain message="500 | Internal Server Error" />;
};

export default ServerError;
