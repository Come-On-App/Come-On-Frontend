import React from 'react';
import { Pressable } from 'react-native';

import Icon from '../Icon';
import { IconButtonProps } from '../../types';

function IconButton({ style, icon, onPress }: IconButtonProps) {
  return (
    <Pressable onPress={onPress} style={style}>
      <Icon name={icon.iconName} size={icon.size} color={icon.color} />
    </Pressable>
  );
}

export default IconButton;
