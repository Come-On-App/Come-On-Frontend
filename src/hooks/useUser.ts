import { useMutation, useQuery } from 'react-query';

import fn from '@utils/fn';
import { QueryKeys, useQueryCache } from '@api/queryClient';
import { requestGetMyInfo, requestUpdateMyInfo } from '@api/user/user';
import type { GetMyInfoResponse } from '@type/api.user';

const useUser = () => {
  const { data: user, refetch } = useQuery(QueryKeys.user, ({ signal }) =>
    requestGetMyInfo(signal),
  );

  return { user, refetch };
};

export default useUser;
