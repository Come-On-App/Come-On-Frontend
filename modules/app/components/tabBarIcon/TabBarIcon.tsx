import React from 'react';

import Icon from '@shared/components/icon/Icon';
import { IconName } from '@shared/components/icon/type';
import { relativeSizeConverter } from '@shared/utils/utils';

export default function createTabBarIcon(name: IconName) {
  const ICON_SIZE = relativeSizeConverter(32);

  return function TabBarIcon({ color }: { color: string }) {
    return <Icon name={name} color={color} size={ICON_SIZE} />;
  };
}
