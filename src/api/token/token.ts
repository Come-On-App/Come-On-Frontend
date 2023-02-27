import { AuthResponse } from '@type/index';
import { getValueFor, save } from '@utils/secureStore';

export enum StoreKey {
  refreshToken = 'refreshToken',
  accessToken = 'accessToken',
}

export const setTokens = async (data: AuthResponse) => {
  await save(StoreKey.accessToken, JSON.stringify(data.accessToken));
  await save(StoreKey.refreshToken, JSON.stringify(data.refreshToken));

  if (data.accessToken !== null && data.refreshToken !== null) return true;

  return false;
};

export const getToken = async () => {
  const token = await getValueFor('accessToken');

  if (token) {
    return JSON.parse(token).token;
  }

  return null;
};
