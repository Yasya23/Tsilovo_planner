import { MessageWithToMainLink } from '@/components/responseMessages';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '404 | Page Not Found',
};

const Custom404 = () => {
  return <MessageWithToMainLink message="404 | Page Not Found" />;
};

export default Custom404;
