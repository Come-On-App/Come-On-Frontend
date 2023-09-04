import { useQuery, useQueryClient } from '@tanstack/react-query';

import { QueryKey } from '@app/api/type';
import { requestGetMeetingMemberMe } from '@post/api/v2';
import { GetMeetingMemberMeResponse } from '@post/api/v2/type';

/**
 * [react-query] 현재 모임에서 나의 상태를 가져온다.
 */
export default function useMeetingMemberMeQuery(meetingId: number) {
  return useQuery({
    queryKey: [QueryKey.detail, QueryKey.user, QueryKey.self, meetingId],
    queryFn: ({ signal }) => requestGetMeetingMemberMe(meetingId, signal),
  });
}

/**
 * [react-query] 모임에서 나의 상태 쿼리 캐시 데이터를 가져온다.
 */
export function useQueryDataByMeetingMemberMe(meetingId: number) {
  const queryClient = useQueryClient();
  const prevData = queryClient.getQueryData<GetMeetingMemberMeResponse>([
    QueryKey.detail,
    QueryKey.user,
    QueryKey.self,
    meetingId,
  ]);

  return prevData;
}
