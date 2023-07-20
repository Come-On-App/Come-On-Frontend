import React from 'react';

import { formatTimeWithAMPM } from '@shared/utils';
import Font from '@shared/components/font/Font';
import { Button } from '@rneui/themed';
import useStyles from './style';
import { ItimePickerButton } from './type';

export default function TimePickerButton({ time, isHost }: ItimePickerButton) {
  const { button, font } = useStyles(isHost);

  return (
    <Button
      disabled={isHost}
      accessibilityHint="TimePickerButtonContainer"
      buttonStyle={button}
      title={<Font style={font}>{formatTimeWithAMPM(time)}</Font>}
    />
  );
}
