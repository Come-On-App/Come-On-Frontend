import React, { memo, useEffect } from 'react';
import MemberBox from '@components/member/MemberBox';

import useMemberQuery, { findHostUser } from '@hooks/query/useMemberQuery';

import { requestMeetingMembers } from '@api/meeting/members';
import { useQuery } from 'react-query';
import { QueryKeys } from '@api/queryClient';
import { View } from 'react-native';
import useMeeting from '@hooks/useMeeting';
// 모임 멤버
function Member({ meetingId }: { meetingId: number }) {
  const { setTotalMemberCounts } = useMeeting();
  const { members } = useMemberQuery(meetingId);

  useEffect(() => {
    if (!meetingData.data) return;

    setTotalMemberCounts(meetingData.data?.contentsCount);
  }, [meetingData.data, meetingData.data?.contentsCount, setTotalMemberCounts]);

  if (!meetingData.data || !host) {
    return null;
  }

  return (
    <Layout>
      <MemberBox
        meetingId={meetingId}
        hostId={findHostUser(members.contents).userId}
        meetingUsers={members.contents}
      />
    </Layout>
  );
}

export default memo(Member);
