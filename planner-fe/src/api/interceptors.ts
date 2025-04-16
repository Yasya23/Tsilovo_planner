import axios from 'axios';

import { services } from '@/shared/constants/api-services';

import { AuthService } from '@/features/auth/services/auth.service';

const baseURL = process.env.NEXT_PUBLIC_APP_URL;

export const axiosClassic = axios.create({
  baseURL: `${baseURL}/api`,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

const axiosAuth = axios.create({
  baseURL: `${baseURL}/api`,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

axiosAuth.interceptors.response.use(
  (res) => res,
  async (err) => {
    const originalRequest = err.config;
    const status = err.response?.status;

    if (!originalRequest._retry) {
      originalRequest._retry = true;
    }

    if (
      status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.includes(`${services.auth}`)
    ) {
      try {
        await AuthService.getNewTokens();
        return axiosAuth(originalRequest);
      } catch (error) {
        console.error('Token refresh failed:', error);
      }
    }

    return Promise.reject(err);
  }
);

export { axiosAuth };
