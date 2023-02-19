import { useQuery } from 'react-query';

import { QueryKeys } from '@api/queryClient';
import { requestGetMeetings } from '@api/meeting/meetings';

const useMeetings = () => {
  const { data: sliceResponse, refetch } = useQuery(QueryKeys.meeting, () =>
    requestGetMeetings(),
  );

  return { sliceResponse, refetch };
};

export default useMeetings;
