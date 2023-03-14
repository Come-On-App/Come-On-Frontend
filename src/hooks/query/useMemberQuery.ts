import { useQuery } from 'react-query';

import { QueryKeys } from '@api/queryClient';
import {
  ErrorMeetingResponse,
  GetMeetingMembersListResponse,
  GetMeetingMembersResponse,
} from '@type/api.meeting';
import { errorAlert } from '@utils/alert';
import { requestMeetingMembers } from '@api/meeting/members';

function useMemberQuery(
  meetingId: number,
  select?: (data: GetMeetingMembersListResponse) => GetMeetingMembersResponse[],
) {
  const { data: members } = useQuery(
    [QueryKeys.meetings, meetingId],
    ({ signal }) => requestMeetingMembers(meetingId, signal),
    {
      onError: (error: ErrorMeetingResponse) => {
        errorAlert(error.response.data.errorDescription);
      },
      select,
    },
  );

  return { members };
}

export default useMemberQuery;
