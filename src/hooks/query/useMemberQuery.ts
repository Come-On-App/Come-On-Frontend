import { useQuery } from 'react-query';

import { QueryKeys } from '@api/queryClient';
import {
  ErrorMeetingResponse,
  GetMeetingMembersResponse,
} from '@type/api.meeting';
import { errorAlert } from '@utils/alert';
import { requestMeetingMembers2 } from '@api/meeting/members';

function useMemberQuery(meetingId: number) {
  const { data: members } = useQuery(
    [QueryKeys.meetingDetail, QueryKeys.members, meetingId],
    ({ signal }) => requestMeetingMembers2(meetingId, signal),
    {
      onError: (error: ErrorMeetingResponse) => {
        errorAlert(error.response.data.errorDescription);
      },
    },
  );

  return { members };
}

export function findHostUser(members: GetMeetingMembersResponse[]) {
  const [hostUser] = members.filter(content => content.memberRole === 'HOST');

  return hostUser;
}

export function isHostUser(
  members: GetMeetingMembersResponse[],
  userId: number,
) {
  return findHostUser(members).userId === userId;
}

export default useMemberQuery;
