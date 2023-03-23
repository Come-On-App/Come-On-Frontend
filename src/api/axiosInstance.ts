import axios, { AxiosRequestConfig } from 'axios';
import { GOOGLE_PLACES_API_KEY, GOOGLE_PLACES_URL, COMEON_API_URL } from '@env';

const googleMapConfig: AxiosRequestConfig = {
  baseURL: GOOGLE_PLACES_URL,
  params: {
    key: GOOGLE_PLACES_API_KEY,
  },
};
const comeonConfig: AxiosRequestConfig = {
  baseURL: COMEON_API_URL,
};

export const mapAxios = axios.create(googleMapConfig);

export const serverAxios = axios.create(comeonConfig);
