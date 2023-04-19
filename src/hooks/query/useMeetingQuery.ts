import { useQuery } from 'react-query';

import { QueryKeys } from '@api/queryClient';
import {
  requestGetMeetingDetail2,
  requestGetMeetings,
} from '@api/meeting/meetings';
import { GetMeetingPayload } from '@type/api.meeting';

const useMeetingQuery = (payload: Partial<GetMeetingPayload>) => {
  const { data: sliceResponse, refetch } = useQuery(
    [QueryKeys.meetings, payload],
    ({ signal }) => requestGetMeetings(payload, signal),
  );

  return { sliceResponse, refetch };
};

export const useMeetingDetailQuery = (meetingId: number) => {
  const { data: meetingDetail } = useQuery(
    [QueryKeys.meetingDetail, meetingId],
    ({ signal }) => requestGetMeetingDetail2(meetingId, signal),
    {
      enabled: Boolean(meetingId),
    },
  );

  return { meetingDetail };
};

export default useMeetingQuery;
