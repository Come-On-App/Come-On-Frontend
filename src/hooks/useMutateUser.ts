import { useMutation } from 'react-query';

import fn from '@utils/fn';
import { invalidateQueries, QueryKeys, useQueryCache } from '@api/queryClient';
import { requestUpdateMyInfo } from '@api/user/user';
import type { GetMyInfoResponse } from '@type/api.user';

const useMutateUser = () => {
  const { getQueryCache, updateQueryCache, cancelQueryCache } =
    useQueryCache<GetMyInfoResponse>(QueryKeys.user);
  const { mutate, isSuccess } = useMutation(requestUpdateMyInfo, {
    onMutate: payload => {
      cancelQueryCache();
      updateQueryCache(fn.defaults(getQueryCache(), payload));
    },
    onSettled: () => {
      invalidateQueries([QueryKeys.meeting]);
    },
  });

  return { mutate, isSuccess };
};

export default useMutateUser;
