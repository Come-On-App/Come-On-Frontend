import React, { memo } from 'react';
import Layout from '@components/Layout';
import MemberBox from '@components/member/MemberBox';

import useMemberQuery, { findHostUser } from '@hooks/query/useMemberQuery';

// 모임 멤버
function Member({ meetingId }: { meetingId: number }) {
  const { members } = useMemberQuery(meetingId);

  if (!members) {
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
