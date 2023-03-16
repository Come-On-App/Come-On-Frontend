import React, { memo } from 'react';
import Layout from '@components/Layout';
import MemberBox from '@components/member/MemberBox';
import { requestMeetingMembers } from '@api/meeting/members';
import { useQuery } from 'react-query';
import { QueryKeys } from '@api/queryClient';

// 모임 멤버
function Member({ meetingId }: { meetingId: number }) {
  const { data: meetingMembers } = useQuery(
    [QueryKeys.members, meetingId],
    ({ signal }) => requestMeetingMembers(meetingId, signal),
    {
      enabled: Boolean(meetingId),
    },
  );

  if (!meetingMembers) {
    return null;
  }

  // find host user
  const [{ userId: hostId }] = meetingMembers.contents.filter(
    content => content.memberRole === 'HOST',
  );

  return (
    <Layout>
      <MemberBox
        meetingId={meetingId}
        hostId={hostId}
        meetingUsers={meetingMembers.contents}
      />
    </Layout>
  );
}

export default memo(Member);
