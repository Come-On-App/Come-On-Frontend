import axios, { AxiosRequestConfig } from 'axios';
import { GOOGLE_PLACES_API_KEY, GOOGLE_PLACES_API, COMEON_API } from '@env';

const googleMapConfig: AxiosRequestConfig = {
  baseURL: GOOGLE_PLACES_API,
  params: {
    key: GOOGLE_PLACES_API_KEY,
  },
};
const comeonConfig: AxiosRequestConfig = {
  baseURL: COMEON_API,
};

export const mapAxios = axios.create(googleMapConfig);

export const serverAxios = axios.create(comeonConfig);
