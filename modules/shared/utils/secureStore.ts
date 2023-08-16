import { UserToken } from '@account/features/auth/type';
import { getItemAsync, setItemAsync, deleteItemAsync } from 'expo-secure-store';
import { asyncWave } from 'async-wave';

const STORE_KEY = 'USER_TOKEN';

/**
 * 사용자 토큰 정보를 키-값 쌍으로 로컬 장치에 암호화하여 안전하게 저장한다.
 *
 * 에러가 발생한다면 null을 반환한다.
 */
export async function setUserTokenToStore(userToken: UserToken) {
  asyncWave([setItemAsync(STORE_KEY, JSON.stringify(userToken))], {
    onError: () => {
      setItemAsync(STORE_KEY, JSON.stringify(null));
    },
  });
}

/**
 * 사용자 토큰 정보를 키-값 쌍으로 로컬 장치에 암호화하여 안전하게 검색한다.
 *
 * 에러가 발생한다면 null을 반환한다.
 */
export async function getUserTokenFromStore(): Promise<UserToken | null> {
  return asyncWave([getItemAsync(STORE_KEY), JSON.parse], {
    onSuccess: (stringifiedUserToken: UserToken) => {
      return stringifiedUserToken;
    },
    onError: () => {
      return null;
    },
  });
}

/**
 * 사용자 토큰 정보를 안전하게 삭제한다.
 */
export async function deleteUserTokenFromStore() {
  await deleteItemAsync(STORE_KEY);
}
