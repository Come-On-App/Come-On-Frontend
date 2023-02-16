import axios, { AxiosRequestConfig } from 'axios';
import { GOOGLE_PLACES_API_KEY, GOOGLE_PLACES_API, COMEON_API } from '@env';

const googleMapConfig: AxiosRequestConfig = {
  baseURL: GOOGLE_PLACES_API,
  params: {
    key: GOOGLE_PLACES_API_KEY,
  },
};
const config: AxiosRequestConfig = {
  baseURL: COMEON_API,
};

// FIXME:
export function getJWTHeader(JWT: string): Record<string, string> {
  if (!JWT) {
    throw new Error('JWT does not exist.');
  }

  return { Authorization: `Bearer ${JWT}` };
}

export const mapAxios = axios.create(googleMapConfig);

export const serverAxios = axios.create(config);
