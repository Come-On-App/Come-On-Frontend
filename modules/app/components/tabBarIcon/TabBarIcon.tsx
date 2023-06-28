import React from 'react';

import Icon from '@shared/components/icon/Icon';
import { IconName } from '@shared/components/icon/type';

export default function createTabBarIcon(name: IconName) {
  const SIZE = 32;

  return function CodeIcon({ color }: { color: string }) {
    return <Icon name={name} color={color} size={SIZE} />;
  };
}
