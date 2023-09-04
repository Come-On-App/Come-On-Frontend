import { useQuery, useQueryClient } from '@tanstack/react-query';

import { QueryKey } from '@app/api/type';
import { requestGetMyInfo } from '@account/api/v2';
import { GetMyInfoResponse } from '@account/api/v2/type';

/**
 * [react-query] 활성화된 유저의 상세 정보를 불러온다.
 */
export default function useMyInfoQuery() {
  const query = useQuery({
    queryKey: [QueryKey.user, QueryKey.self],
    queryFn: ({ signal }) => requestGetMyInfo(signal),
  });

  return query;
}

/**
 * [react-query] 기존 사용자 정보 쿼리 데이터를 가져온다.
 */
export function useQueryDataByUser() {
  const queryClient = useQueryClient();
  const prevData = queryClient.getQueryData<GetMyInfoResponse>([
    QueryKey.user,
    QueryKey.self,
  ]);

  return prevData;
}
