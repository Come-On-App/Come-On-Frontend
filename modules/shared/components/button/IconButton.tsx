import { View, Pressable } from 'react-native';
import React from 'react';

import TestId from '@shared/constants/testIds';
import Icon from '../icon/Icon';
import { IiconButton } from './type';

export default function IconButton({
  onPress,
  color,
  size,
  name,
}: IiconButton) {
  return (
    <View style={{ width: size }}>
      <Pressable
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
