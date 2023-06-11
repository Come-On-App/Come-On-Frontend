import { View } from 'react-native';
import React from 'react';

import TestId from '@shared/constants/testIds';
import IconButton from '@shared/components/button/IconButton';
import useStyles from './style';

export default function MeetingCreateButton() {
  const {
    buttonIcon: { color, size },
    cButtonIcon,
  } = useStyles();
  const onPressHandler = () => null;

  return (
    <View testID={TestId.post.button.create} style={cButtonIcon}>
      <IconButton
        onPress={onPressHandler}
        name="add"
        color={color}
        size={size}
      />
    </View>
  );
}
