import { QueryKeys } from '@app/api/type';
import { requestGetDateVotingDetails } from '@post/api/v1';
import { useQuery } from '@tanstack/react-query';

/**
 * [react-query] 선택된 날짜의 투표 현황 정보를 불러온다.
 */
export default function useDateVotingDetailsQuery(
  meetingId: number,
  dateString: string,
) {
  return useQuery({
    queryKey: QueryKeys.postVoteDate(dateString),
    queryFn: ({ signal }) => {
      return requestGetDateVotingDetails(
        { meetingId, date: dateString },
        signal,
      );
    },
  });
}
