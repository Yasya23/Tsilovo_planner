import axios from 'axios';

import { services } from '@/shared/constants/api-services';
import { AuthenticationService } from '@/shared/services/authentication.service';

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
    const status = err.response?.status || err?.status;

    if (
      status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.endsWith(services.token)
    ) {
      originalRequest._retry = true;

      try {
        await AuthenticationService.getNewTokens();
        return axiosAuth(originalRequest);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(err);
  }
);

export { axiosAuth };
