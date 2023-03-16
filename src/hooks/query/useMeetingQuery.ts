import { useQuery } from 'react-query';

import { QueryKeys } from '@api/queryClient';
import {
  requestGetMeetingDetail,
  requestGetMeetings,
} from '@api/meeting/meetings';

const useMeetingQuery = () => {
  const { data: sliceResponse, refetch } = useQuery([QueryKeys.meetings], () =>
    requestGetMeetings(),
  );

  return { sliceResponse, refetch };
};

export const useMeetingDetailQuery = (meetingId: number) => {
  const { data: meetingDetail } = useQuery(
    [QueryKeys.meetingDetail, meetingId],
    ({ signal }) => requestGetMeetingDetail(meetingId, signal),
    {
      enabled: Boolean(meetingId),
    },
  );

  return { meetingDetail };
};

export default useMeetingQuery;
