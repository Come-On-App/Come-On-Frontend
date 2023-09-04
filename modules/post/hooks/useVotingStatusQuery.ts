import { QueryKey } from '@app/api/type';
import { requestGetDateVoting } from '@post/api/v1';
import { useQuery } from '@tanstack/react-query';

/**
 * [react-query] 현재 모임에서 투표 리스트 정보를 가져온다.
 */
export default function useVotingStatusQuery(meetingId: number) {
  return useQuery({
    queryKey: [QueryKey.detail, QueryKey.vote, QueryKey.list, meetingId],
    queryFn: ({ signal }) => requestGetDateVoting(meetingId, signal),
  });
}
