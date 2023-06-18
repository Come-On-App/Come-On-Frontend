import { View } from 'react-native';
import React from 'react';

import { ScreenTitle } from '@shared/components/font/Font';
import PressableInput from '@shared/components/input/PressableInput';
import useStyles from './style';

const TITLE = '투표 기간';
const DESCRIPTION = '날짜 범위를 선택해 주세요';

export default function VotingTimeRangePicker() {
  const { container, icon, font } = useStyles();

  return (
    <View>
      <ScreenTitle>{TITLE}</ScreenTitle>
      <PressableInput
        text={DESCRIPTION}
        icon={icon}
        containerStyle={container}
        fontColor={font.color}
      />
    </View>
  );
}
