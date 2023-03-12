import { useQuery } from 'react-query';

import { QueryKeys } from '@api/queryClient';
import { requestGetMyInfo } from '@api/user/user';
import { GetMyInfoResponse } from '@type/api.user';
import { pickSafelyBy } from '@utils/fn';

export const fallbackImage =
  'https://comeon-app-backend-dev.s3.ap-northeast-2.amazonaws.com/dev/13/0fba9466-316b-4fd9-a293-9b1e4db94391.blob' as string;

const pickSafelyByIamge = (user: GetMyInfoResponse) => {
  return pickSafelyBy(user, 'profileImageUrl', fallbackImage);
};
const transformImage = (data: GetMyInfoResponse): GetMyInfoResponse => {
  return {
    ...data,
    profileImageUrl: pickSafelyByIamge(data),
  };
};

function useUserQuery() {
  const { data: user, refetch } = useQuery({
    queryKey: [QueryKeys.user],
    queryFn: ({ signal }) => requestGetMyInfo(signal),
    select: transformImage,
  });

  return { user, refetch };
}

export default useUserQuery;
