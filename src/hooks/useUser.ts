import { useQuery } from 'react-query';

import { QueryKeys } from '@api/queryClient';
import { requestGetMyInfo } from '@api/user/user';

const useUser = () => {
  const { data: user, refetch } = useQuery(QueryKeys.user, ({ signal }) =>
    requestGetMyInfo(signal),
  );

  return { user, refetch };
};

export default useUser;
