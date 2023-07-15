import { Button as RneButton } from '@rneui/themed';
import React from 'react';

import TestId from '@shared/constants/testIds';
import useStyle from './style';
import { Ibutton } from './type';

export const DEFUALT_BUTTON_WIDTH = 192;

export default function Button({
  onPress,
  title,
  bold,
  backgroundColor,
  disabled,
}: Ibutton) {
  const { defaultStyle, font } = useStyle({ bold, backgroundColor });

  return (
    <RneButton
      testID={TestId.shared.button.default}
      onPress={onPress}
      title={title}
      buttonStyle={[defaultStyle]}
      titleStyle={[font]}
      disabled={disabled}
    />
  );
}
