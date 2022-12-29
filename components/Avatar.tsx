import React from 'react';
import { Avatar as RneAvatar } from '@rneui/themed';

import { AvatarProps } from '../types';

function Avatar({ size, path }: AvatarProps) {
  return <RneAvatar size={size} rounded source={{ uri: path }} />;
}

export default Avatar;
