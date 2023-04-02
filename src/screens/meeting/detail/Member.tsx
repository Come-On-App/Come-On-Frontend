import React, { memo, useEffect } from 'react';
import { MeetingLayout } from '@components/Layout';
import MemberBox from '@components/member/MemberBox';

import useMemberQuery, { findHostUser } from '@hooks/query/useMemberQuery';

import useMeeting from '@hooks/useMeeting';

// 모임 멤버
function Member({ meetingId }: { meetingId: number }) {
  const { setTotalMemberCounts } = useMeeting();
  const { members } = useMemberQuery(meetingId);

  useEffect(() => {
    if (!members) return;

    setTotalMemberCounts(members.contentsCount);
  }, [members, setTotalMemberCounts]);

  if (!members) {
    return null;
  }

  return (
    <MeetingLayout>
      <MemberBox
        meetingId={meetingId}
        hostId={findHostUser(members.contents).userId}
        meetingUsers={members.contents}
      />
    </MeetingLayout>
  );
}

export default memo(Member);
