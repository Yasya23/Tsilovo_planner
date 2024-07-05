import axios from 'axios';

const baseURL = process.env.NEXT_PUBLIC_APP_URL;

export const axiosClassic = axios.create({
  baseURL: `${baseURL}/api`,
  headers: { 'Content-Type': 'application/json' },
});
