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

/**
 * [react-query] 기존 쿼리 캐시를 업데이트 시킨다.
 *
 * @param queryKey 쿼리 키
 * @param updater 업데이트 함수
 */
export function setQueryData<T>(
  queryKey: unknown[],
  updater: (payload: T | undefined) => T | undefined,
) {
  queryClient.setQueryData(queryKey, updater);
}

/**
 * [react-query] 전달된 쿼리키와 관련된 모든 항목을 업데이트 시킨다.
 *
 * @param queryKey 쿼리 키
 * @param updater 업데이트 함수
 */
export function setQueriesData<T>(
  queryKey: unknown[],
  updater: (payload: T | undefined) => T | undefined,
) {
  queryClient.setQueriesData(queryKey, updater);
}

/**
 * [react-query] 전달된 쿼리키와 관련된 모든 항목을 무효화 시킨다.
 *
 * @param queryKey 쿼리 키
 */
export function invalidateQueries(queryKey: unknown[]) {
  queryClient.invalidateQueries(queryKey);
}
