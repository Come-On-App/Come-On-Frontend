import { QueryKeys } from '@app/api/type';
import { requestGetDateVoting } from '@post/api/v1';
import { GetDateVotingListResponse } from '@post/api/v1/type';
import { useQuery, useQueryClient } from '@tanstack/react-query';

/**
 * [react-query] 현재 모임에서 투표 리스트 정보를 가져온다.
 */
export default function useVotingStatusQuery(
  meetingId: number,
  enabled?: boolean,
) {
  return useQuery({
    queryKey: QueryKeys.postVoteDetail(meetingId),
    queryFn: ({ signal }) => requestGetDateVoting(meetingId, signal),
    enabled,
  });
}

/**
 * [react-query] 현재 모임에서 투표 리스트 정보 쿼리 캐시 데이터를 가져온다.
 */
export function useQueryDataByVotingStatus(meetingId: number) {
  const queryClient = useQueryClient();
  const prevData = queryClient.getQueryData<GetDateVotingListResponse>(
    QueryKeys.postVoteDetail(meetingId),
  );

  return prevData;
}

/**
 * [react-query] 현재 모임에서 투표 리스트 정보 쿼리 캐시 데이터를 가져온다.
 *
 * 캐시 데이터가 존재하지 않는다면 서버로 API 요청.
 */
export function useCustomVotingStatus(postId: number) {
  const queryClient = useQueryClient();
  const cacheData = queryClient.getQueryData<GetDateVotingListResponse>(
    QueryKeys.postVoteDetail(postId),
  );
  const { data, isLoading, isError } = useVotingStatusQuery(postId, !cacheData);
  const votingStatusData = (cacheData as GetDateVotingListResponse) || data;

  return {
    data: votingStatusData,
    isLoading,
    isError,
  };
}
