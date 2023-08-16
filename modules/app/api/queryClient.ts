/* eslint-disable import/prefer-default-export */
import { QueryClient } from '@tanstack/react-query';

import { checkIfAccessTokenExpired } from './utils';

const RETRY_COUNT = 1;

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: shouldDisallowRetryOnExpiration,
    },
    mutations: {
      retry: shouldDisallowRetryOnExpiration,
    },
  },
});

// 만료 에러 응답 코드의 경우, 재시도를 시도하지 않는다.
function shouldDisallowRetryOnExpiration(failureCount: number, error: unknown) {
  const NOT_RETRY = false;

  if (checkIfAccessTokenExpired(error)) return NOT_RETRY;

  return failureCount < RETRY_COUNT;
}
