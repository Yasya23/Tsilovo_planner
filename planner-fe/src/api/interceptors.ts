import axios from 'axios';
import { getToken } from '@/helpers';
import { responseError } from '@/utils';
import { deleteCookies, setCookies } from '@/helpers';
import { AuthService } from '@/services/auth.service';

const baseURL = process.env.NEXT_PUBLIC_APP_URL;

export const axiosClassic = axios.create({
  baseURL: `${baseURL}/api`,
  headers: { 'Content-Type': 'application/json' },
});

const instance = axios.create({
  baseURL: `${baseURL}/api`,
  headers: { 'Content-Type': 'application/json' },
});

axiosClassic.interceptors.request.use((config) => {
  const accessToken = getToken();

  if (config.headers && accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const errorStatus = error.response?.status;
    const errorMessage = responseError(error);

    if (
      (errorStatus === 401 ||
        errorMessage === 'jwt expired' ||
        errorMessage === 'jwt must be provided') &&
      originalRequest &&
      !originalRequest._retry
    ) {
      console.error(11);
      originalRequest._retry = true;
      try {
        const newTokens = await AuthService.getTokens();
        const { accessToken } = newTokens;
        setCookies(newTokens);

        instance.defaults.headers.common[
          'Authorization'
        ] = `Bearer ${accessToken}`;

        originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;
        return instance(originalRequest);
      } catch (refreshError) {
        if (responseError(refreshError) === 'jwt expired') {
          deleteCookies();
        }
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default instance;
