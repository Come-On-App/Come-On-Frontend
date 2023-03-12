import { useQuery } from 'react-query';

import { QueryKeys } from '@api/queryClient';
import { requestGetMeetings } from '@api/meeting/meetings';

const useMeetingQuery = () => {
  const { data: sliceResponse, refetch } = useQuery([QueryKeys.meetings], () =>
    requestGetMeetings(),
  );

  return { sliceResponse, refetch };
};

export default useMeetingQuery;
