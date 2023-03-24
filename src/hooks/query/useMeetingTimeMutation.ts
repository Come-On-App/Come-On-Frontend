import { requestPostMeetingTime } from '@api/meeting/meetings';

import { QueryKeys, useQueryCache } from '@api/queryClient';
import { GetMeetingTimeResponse } from '@type/api.meeting';
import { useMutation } from 'react-query';

const useMeetingTimeMutation = (meetingId: number) => {
  const { updateQueryCache, cancelQueryCache } =
    useQueryCache<GetMeetingTimeResponse>([
      QueryKeys.meetingDetail,
      QueryKeys.time,
      meetingId,
    ]);
  const { mutate: postMeetingTime } = useMutation(requestPostMeetingTime, {
    onMutate: payload => {
      cancelQueryCache();
      updateQueryCache({ meetingStartTime: payload.meetingStartTime });
    },
  });

  return { postMeetingTime };
};

export default useMeetingTimeMutation;
