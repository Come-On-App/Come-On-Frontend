import { QueryKey } from '@app/api/type';
import { requestGetMeetingDetail } from '@post/api/v2';
import { useQuery } from '@tanstack/react-query';

/**
 * [react-query] 활성화된 모임의 상세 정보를 불러온다.
 */
export default function useMeetingDetailQuery(meetingId: number) {
  return useQuery({
    queryKey: [QueryKey.post, QueryKey.detail, meetingId],
    queryFn: ({ signal }) => requestGetMeetingDetail(meetingId, signal),
  });
}
