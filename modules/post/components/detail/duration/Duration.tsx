import React from 'react';

import ScreenLayout from '@shared/components/layout/ScreenLayout';
import { ScreenTitle } from '@shared/components/font/Font';
import { View } from 'react-native';
import DividerWrapper from '../../../../shared/components/layout/DividerWrapper';
import ContentHeader from '../../../../shared/components/layout/ContentHeader';
import Schedule from './schedule/Schedule';
import TimePickerButton from './timePickerButton/TimePickerButton';
import { Iduration } from './type';
import useStyles from './style';

const TITLE = '모임 기간';

export default function Duration({
  range: { range, isFixed },
  time: { time, isHost },
}: Iduration) {
  const { cContent } = useStyles();

  return (
    <DividerWrapper>
      <ScreenLayout>
        <ContentHeader>
          <ScreenTitle>{TITLE}</ScreenTitle>
        </ContentHeader>
        <View style={cContent}>
          <Schedule range={range} isFixed={isFixed} />
          <TimePickerButton time={time} isHost={isHost} />
        </View>
      </ScreenLayout>
    </DividerWrapper>
  );
}
