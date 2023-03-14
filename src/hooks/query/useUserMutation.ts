import { useMutation } from 'react-query';

import fn from '@utils/fn';
import { QueryKeys, useQueryCache } from '@api/queryClient';
import { requestUpdateMyInfo } from '@api/user/user';
import type { GetMyInfoResponse, ErrorUserResponse } from '@type/api.user';
import { errorAlert } from '@utils/alert';

const useUserMutation = () => {
  const { getQueryCache, updateQueryCache, cancelQueryCache } =
    useQueryCache<GetMyInfoResponse>([QueryKeys.user]);
  const { mutate } = useMutation(requestUpdateMyInfo, {
    onMutate: payload => {
      cancelQueryCache();
      const previouseData = getQueryCache();

      updateQueryCache(fn.defaults(previouseData, payload));

      return { previouseData };
    },
    onError: (error: ErrorUserResponse, _newData, context) => {
      if (context?.previouseData) {
        updateQueryCache(context.previouseData);
        errorAlert(error.response.data.errorDescription);
      }
    },
  });

  return { mutate };
};

export default useUserMutation;
