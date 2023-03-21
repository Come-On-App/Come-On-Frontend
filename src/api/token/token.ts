import useAuth from '@hooks/useAuth';
import { AuthResponse } from '@type/index';
import { deleteValueFor, getValueFor, save } from '@utils/secureStore';

export enum StoreKey {
  refreshToken = 'refreshToken',
  accessToken = 'accessToken',
}

export const getTokenData = async (name: 'accessToken' | 'refreshToken') => {
  const tokenData = await getValueFor(name);

  if (tokenData) return JSON.parse(tokenData);

  return null;
};

export const setTokensToDB = async (data: AuthResponse) => {
  console.log(data);
  await save(StoreKey.accessToken, JSON.stringify(data.accessToken));
  await save(StoreKey.refreshToken, JSON.stringify(data.refreshToken));

  console.log('ghiasd');

  if (data.accessToken !== null && data.refreshToken !== null) return true;

  return false;
};

export const deleteTokensfromDB = async () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks

  await deleteValueFor(StoreKey.accessToken);
  await deleteValueFor(StoreKey.refreshToken);
};

export const getToken = async () => {
  const token = await getValueFor(StoreKey.accessToken);

  if (token) {
    return JSON.parse(token).token;
  }

  return null;
};

export const getRefreshToken = async () => {
  const token = await getValueFor(StoreKey.refreshToken);

  if (token) {
    return JSON.parse(token).token;
  }

  return null;
};
