import React from 'react';

import type { RootStackScreenProps } from '@type/navigation';
import useSubscribe from '@hooks/useSubscribe';
import { useMeetingDetailQuery } from '@hooks/query/useMeetingQuery';
import Place from './place';
import Member from './Member';
import Date from './date';
import { Container, useSetTitle } from './common';

// 모임 상세 (모임 카드 클릭시 스크린)
export default function MeetingDetail({
  route: {
    params: { meetingId },
  },
  navigation,
}: RootStackScreenProps<'MeetingDetail'>) {
  const { meetingDetail } = useMeetingDetailQuery(meetingId);

  useSubscribe(meetingId);
  useSetTitle(navigation, meetingDetail);

  if (!meetingDetail) {
    return null;
  }

  return (
    <Container FixedItem={<Member meetingId={meetingId} />}>
      <Date
        meetingId={meetingId}
        navigation={navigation}
        calendar={meetingDetail.meetingMetaData.calendar}
      />
      <Place meetingId={meetingId} navigation={navigation} />
    </Container>
  );
}
