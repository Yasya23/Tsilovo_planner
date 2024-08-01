'use server';

import { UserAuth } from '@/types/userAuth.type';
import { cookies } from 'next/headers';

export const setCookies = ({ refreshToken, accessToken }: UserAuth) => {
  cookies().set('value', accessToken);
  cookies().set('updater', refreshToken);
};

export const deleteCookies = () => {
  cookies().delete('value');
  cookies().delete('updater');
};

export const getToken = () => {
  return cookies().get('updater');
};
