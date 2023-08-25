import { QueryKeys } from '@app/api/type';
import { requestGetMeetingDetail } from '@post/api/v2';
import { useQuery } from '@tanstack/react-query';

/**
 * [react-query] 활성화된 모임의 상세 정보를 불러온다.
 */
export default function useMeetingDetailQuery(meetingId: number) {
  const query = useQuery({
    queryKey: [QueryKeys.user, meetingId],
    queryFn: ({ signal }) => requestGetMeetingDetail(meetingId, signal),
  });

  return query;
}
