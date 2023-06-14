import React from 'react';
import { Icon as IconComponent } from '@rneui/themed';

import { Iicon } from './type';

export default function Icon({ name, color, size }: Iicon) {
  return <IconComponent size={size} name={name} color={color} />;
}
