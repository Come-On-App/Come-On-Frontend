import React from 'react';
import { View } from 'react-native';

import ScreenLayout from '@shared/components/layout/ScreenLayout';
import { ScreenTitle } from '@shared/components/font/Font';
import DividerWrapper from '@shared/components/layout/DividerWrapper';
import ContentHeader from '@shared/components/layout/ContentHeader';
import useMeetingDetailQuery from '@post/hooks/useMeetingDetailQuery';
import useMyInfoQuery from '@account/hooks/useMyInfoQuery';
import { Skeleton } from '@rneui/themed';
import Schedule from './schedule/Schedule';
import TimePickerButton from './timePickerButton/TimePickerButton';
import { Iduration } from './type';
import useStyles from './style';

const TITLE = '모임 기간';

export default function Duration({ id }: Iduration) {
  const { cContent, skeleton } = useStyles();
  const { data: detail } = useMeetingDetailQuery(id);
  const { data: user } = useMyInfoQuery();
  let Content = (
    <View style={cContent}>
      <Skeleton height={skeleton.height} />
    </View>
  );

  if (detail && user) {
    const { calendar, fixedDate, meetingStartTime, hostUser } =
      detail.meetingMetaData;

    Content = (
      <View style={cContent}>
        <Schedule range={calendar} fixedDate={fixedDate} />
        <TimePickerButton
          time={meetingStartTime}
          isHost={hostUser.userId === user.userId}
        />
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
