import { Button as RneButton } from '@rneui/themed';
import React from 'react';

import TestId from '@shared/constants/testIds';
import useStyle from './style';

interface Ibutton {
  onPress: () => void;
  title: string;
  bold?: boolean;
  backgroundColor?: string;
}

export default function Button({
  onPress,
  title,
  bold,
  backgroundColor,
}: Ibutton) {
  const { defaultStyle, font } = useStyle({ bold, backgroundColor });

  return (
    <RneButton
      testID={TestId.shared.button.default}
      onPress={onPress}
      title={title}
      buttonStyle={[defaultStyle]}
      titleStyle={[font]}
    />
  );
}
