import { View, Pressable } from 'react-native';
import React from 'react';

import TestId from '@shared/constants/testIds';
import Icon from '../icon/Icon';
import { IIconButton } from './type';

export default function IconButton({
  onPress,
  color,
  size,
  name,
  containerStyle,
  _pressed,
}: IIconButton) {
  return (
    <View style={[{ width: size }, containerStyle]}>
      <Pressable
        testOnly_pressed={_pressed}
        onPress={onPress}
        testID={TestId.shared.button.icon}
        style={({ pressed }) => [
          pressed && {
            borderRadius: size,
            opacity: 0.3,
          },
        ]}
      >
        <Icon name={name} size={size} color={color} />
      </Pressable>
    </View>
  );
}
