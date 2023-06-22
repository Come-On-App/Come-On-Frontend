import React from 'react';
import { Avatar as RneAvatar } from '@rneui/themed';
import { Iavatar } from './type';

const defulatSize = 40;

export default function Avatar({ size = defulatSize, path }: Iavatar) {
  return <RneAvatar size={size} rounded source={path ? { uri: path } : {}} />;
}
