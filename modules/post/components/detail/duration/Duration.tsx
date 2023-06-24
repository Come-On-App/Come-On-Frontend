import React from 'react';

import ScreenLayout from '@shared/components/layout/ScreenLayout';
import { ScreenTitle } from '@shared/components/font/Font';
import DividerWrapper from '../DividerWrapper';
import ContentHeader from '../ContentHeader';
import Schedule from './schedule/Schedule';
import TimePickerButton from './timePickerButton/TimePickerButton';
import { Iduration } from './type';

const TITLE = '모임 기간';

export default function Duration({
  range: { range, isFixed },
  time: { time, isHost },
}: Iduration) {
  return (
    <DividerWrapper>
      <ScreenLayout>
        <ContentHeader>
          <ScreenTitle>{TITLE}</ScreenTitle>
        </ContentHeader>
        <Schedule range={range} isFixed={isFixed} />
        <TimePickerButton time={time} isHost={isHost} />
      </ScreenLayout>
    </DividerWrapper>
  );
}
