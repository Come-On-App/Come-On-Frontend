import React, { useEffect } from 'react';
import MemberBox from '@components/member/MemberBox';
import { requestMeetingMembers } from '@api/meeting/members';
import { useQuery } from 'react-query';
import { QueryKeys } from '@api/queryClient';
import { View } from 'react-native';
import useMeeting from '@hooks/useMeeting';
// 모임 멤버
export default function Member({ meetingId }: { meetingId: number }) {
  const { setTotalMemberCounts } = useMeeting();
  const meetingData = useQuery([QueryKeys.members], () =>
    requestMeetingMembers(meetingId),
  );
  // 셀렉터
  const host = meetingData.data?.contents.filter(
    data => data.memberRole === 'HOST',
  )[0];

  useEffect(() => {
    if (!meetingData.data) return;

    setTotalMemberCounts(meetingData.data?.contentsCount);
  }, [meetingData.data, meetingData.data?.contentsCount, setTotalMemberCounts]);

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
