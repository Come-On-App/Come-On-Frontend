import { View } from 'react-native';
import React from 'react';

import { formatTimeWithAMPM } from '@shared/utils/utils';
import Font from '@shared/components/font/Font';
import useStyles from './style';
import { ItimePickerButton } from './type';

export default function TimePickerButton({ time, isHost }: ItimePickerButton) {
  const { cTimePickerButton, font } = useStyles(isHost);

  return (
    <View
      accessibilityHint="TimePickerButtonContainer"
      style={cTimePickerButton}
    >
      <Font style={font}>{formatTimeWithAMPM(time)}</Font>
    </View>
  );
}
