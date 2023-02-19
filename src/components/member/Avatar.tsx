import React from 'react';
import { Avatar as RneAvatar } from '@rneui/themed';

import type { AvatarProps } from '@type/index';

function Avatar({ size, path, containerStyle }: AvatarProps) {
  return (
    <RneAvatar
      size={size}
      rounded
      source={path ? { uri: path } : undefined}
      containerStyle={containerStyle}
    />
  );
}

export default Avatar;
