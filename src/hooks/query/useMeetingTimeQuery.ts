import { useQuery } from 'react-query';

import { QueryKeys } from '@api/queryClient';
import { requestGetMeetingTime } from '@api/meeting/meetings';

function useMeetingTimeQuery(meetingId: number) {
  const { data: meetingTime } = useQuery(
    [QueryKeys.meetingDetail, QueryKeys.time, meetingId],
    ({ signal }) => requestGetMeetingTime({ meetingId }, signal),
    {
      select: ({ meetingStartTime }) => {
        return `1970-01-01T${meetingStartTime}`;
      },
    },
  );

  return { meetingTime };
}

export default useMeetingTimeQuery;
