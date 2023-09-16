import { QueryKeys } from '@app/api/type';
import { requestGetMeetingDetail } from '@post/api/v2';
import { GetMeetingDetailResponse } from '@post/api/v2/type';
import { useQuery, useQueryClient } from '@tanstack/react-query';

/**
 * [react-query] 활성화된 모임의 상세 정보를 불러온다.
 */
export default function useMeetingDetailQuery(
  meetingId: number,
  enabled?: boolean,
) {
  return useQuery({
    queryKey: QueryKeys.postDetail(meetingId),
    queryFn: ({ signal }) => requestGetMeetingDetail(meetingId, signal),
    enabled,
  });
}

/**
 * [react-query] 활성화된 모임의 상세 정보 쿼리 캐시 데이터를 가져온다.
 */
export function useQueryDataByMeetingDetail(meetingId: number) {
  const queryClient = useQueryClient();
  const prevData = queryClient.getQueryData<GetMeetingDetailResponse>(
    QueryKeys.postDetail(meetingId),
  );

  return prevData;
}

/**
 * [react-query] 활성화된 모임의 상세 정보 쿼리 캐시 데이터를 가져온다.
 *
 * 캐시 데이터가 존재하지 않는다면 서버로 API 요청.
 */
export function useCustomMeetingDetail(meetingId: number) {
  const queryClient = useQueryClient();
  const cacheData = queryClient.getQueryData<GetMeetingDetailResponse>(
    QueryKeys.postDetail(meetingId),
  );
  const { data, isLoading, isError } = useMeetingDetailQuery(
    meetingId,
    !cacheData,
  );
  const detailData = (cacheData as GetMeetingDetailResponse) || data;

  return {
    data: detailData,
    isLoading,
    isError,
  };
}
