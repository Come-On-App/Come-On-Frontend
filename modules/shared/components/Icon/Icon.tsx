import React from 'react';
import { Icon as IconComponent } from '@rneui/themed';

import { IconProps } from './type';

export default function Icon({ name, color, size }: IconProps) {
  return <IconComponent size={size} name={name} color={color} />;
}
