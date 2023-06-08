import React from 'react';

import Icon from '@shared/components/icon/Icon';
import { IconName } from '@shared/components/icon/type';
import tabBarIcon from './config';

export default function createTabBarIcon(name: IconName) {
  const { size } = tabBarIcon;

  return function CodeIcon({ color }: { color: string }) {
    return <Icon name={name} color={color} size={size} />;
  };
}
