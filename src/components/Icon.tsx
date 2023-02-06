import React from 'react';
import { Icon as IconComponent } from '@rneui/themed';

import { IconName, IconProps, TabBarIconProps } from '../types';

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function Icon({ name, size, color }: IconProps) {
  return <IconComponent size={size} name={name} color={color} />;
}

export default Icon;

export function createTabBarIcon(name: IconName) {
  const size = 32;

  return function CodeIcon({ color }: TabBarIconProps) {
    return <Icon name={name} color={color} size={size} />;
  };
}

export function PressableIcon({ name, size, color, onPress }: IconProps) {
  return (
    <IconComponent size={size} name={name} color={color} onPress={onPress} />
  );
}
