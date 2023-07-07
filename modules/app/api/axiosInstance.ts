import axios, { AxiosRequestConfig } from 'axios';

export const BASE_URL = process.env.SERVER_API_URL ?? 'http://localhost';

const comeonApiAxiosConfig: AxiosRequestConfig = {
  baseURL: BASE_URL,
};

export const comeonApiAxios = axios.create(comeonApiAxiosConfig);
