import React from 'react';
import { View } from 'react-native';

import ScreenLayout from '@shared/components/layout/ScreenLayout';
import { ScreenTitle } from '@shared/components/font/Font';
import DividerWrapper from '@shared/components/layout/DividerWrapper';
import ContentHeader from '@shared/components/layout/ContentHeader';
import useMeetingDetailQuery from '@post/hooks/useMeetingDetailQuery';
import { Skeleton } from '@rneui/themed';
import useDetailManagement from '@post/hooks/useDetailManagement';
import useMeetingMemberMeQuery from '@post/hooks/useMeetingMemberMeQuery';
import useVotingStatusQuery from '@post/hooks/useVotingStatusQuery';
import useRefreshOnFocus from '@shared/hooks/useRefreshOnFocus';
import Schedule from './schedule/Schedule';
import TimePickerButton from './timePickerButton/TimePickerButton';
import useStyles from './style';

const TITLE = '모임 기간';

export default function Duration() {
  const { cContent, skeleton, timePickerContainer } = useStyles();
  const {
    detailState: { postId },
  } = useDetailManagement();
  const { data: detail, refetch: meetingDetailRefetch } = useMeetingDetailQuery(
    postId,
    postId !== 0,
  );
  const { data: currentPostUserData } = useMeetingMemberMeQuery(postId);
  const { data: votingStatus } = useVotingStatusQuery(postId, postId !== 0);
  const isContentLoaded = detail && currentPostUserData && votingStatus;
  let Content = (
    <View style={cContent}>
      <Skeleton height={skeleton.height} />
    </View>
  );

  useRefreshOnFocus(meetingDetailRefetch);

  if (isContentLoaded) {
    const { calendar, fixedDate, meetingStartTime } = detail.meetingMetaData;
    const isHost = currentPostUserData.memberRole === 'HOST';

    Content = (
      <View style={cContent}>
        <Schedule
          range={calendar}
          fixedDate={fixedDate}
          isHost={isHost}
          members={detail.members}
        />
        <View style={timePickerContainer}>
          <TimePickerButton time={meetingStartTime} isHost={isHost} />
        </View>
      </View>
    );
  }

  return (
    <DividerWrapper>
      <ScreenLayout>
        <ContentHeader>
          <ScreenTitle>{TITLE}</ScreenTitle>
        </ContentHeader>
        {Content}
      </ScreenLayout>
    </DividerWrapper>
  );
}
