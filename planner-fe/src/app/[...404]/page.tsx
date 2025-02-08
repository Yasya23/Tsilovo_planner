import { MessageNavigator } from '@/components/messageNavigator/MessageNavigator';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '404 | Page Not Found',
};

const Custom404 = () => {
  return <MessageNavigator message="404 | Page Not Found" />;
};

export default Custom404;
