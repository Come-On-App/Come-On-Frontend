import React from 'react';
import Layout from '@components/Layout';
import MemberBox from '@components/member/MemberBox';
import { requestMeetingMembers } from '@api/meeting/members';
import { useQuery } from 'react-query';
import { QueryKeys } from '@api/queryClient';
import { View } from 'react-native';
// 모임 멤버
export default function Member({ meetingId }: { meetingId: number }) {
  const meetingData = useQuery([QueryKeys.members], () =>
    requestMeetingMembers(meetingId),
  );
  // 셀렉터
  const host = meetingData.data?.contents.filter(
    data => data.memberRole === 'HOST',
  )[0];

  // 스켈레톤 추가
  if (!meetingData.data || !host) {
    return null;
  }

  return (
    <View>
      <MemberBox
        meetingId={meetingId}
        hostId={host.userId}
        meetingUsers={meetingData.data?.contents}
      />
    </View>
  );
}
