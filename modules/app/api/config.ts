import { AxiosRequestConfig } from 'axios';

const LOCAL_URL = 'http://localhost';

export const BASE_URL = process.env.SERVER_API_URL ?? LOCAL_URL;

export const serverAPIConfig: AxiosRequestConfig = {
  baseURL: BASE_URL,
};
