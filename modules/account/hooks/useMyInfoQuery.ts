import { requestGetMyInfo } from '@account/api/v2';
import { QueryKeys } from '@app/api/type';
import { useQuery } from '@tanstack/react-query';

/**
 * 활성화된 유저의 상세 정보를 불러온다.
 */
export default function useMyInfoQuery() {
  const query = useQuery({
    queryKey: [QueryKeys.user],
    queryFn: ({ signal }) => requestGetMyInfo(signal),
  });

  return query;
}
