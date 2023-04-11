import { useQuery } from 'react-query';

import { QueryKeys } from '@api/queryClient';
import { requestGetMyInfo2 } from '@api/user/user';

function useUserQuery() {
  const { data: user, refetch } = useQuery({
    queryKey: [QueryKeys.user],
    queryFn: ({ signal }) => requestGetMyInfo2(signal),
  });

  return { user, refetch };
}

export default useUserQuery;
