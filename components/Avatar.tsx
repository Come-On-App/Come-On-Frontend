import React from 'react';
import { Avatar as RneAvatar } from '@rneui/themed';

import type { AvatarProps, BadgedAvatarProps } from '../types';

export function Avatar({ size, path }: AvatarProps) {
  return <RneAvatar size={size} rounded source={{ uri: path }} />;
}

export function BadgedAvatar({
  size,
  path,
  badge: { icon, backgroundColor },
}: BadgedAvatarProps) {
  return (
    <RneAvatar size={size} rounded source={{ uri: path }}>
      <RneAvatar.Accessory
        style={{
          backgroundColor,
          elevation: 0,
          borderWidth: 0,
          shadowOpacity: 0,
        }}
        size={icon.size}
        color={icon.color}
        name={icon.iconName}
      />
    </RneAvatar>
  );
}
