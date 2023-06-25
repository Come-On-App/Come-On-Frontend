import React from 'react';
import { Avatar as RneAvatar } from '@rneui/themed';
import { Iavatar } from './type';
import useStyle from './style';

const defulatSize = 40;

/**
 * 빈 문자열, 잘못된 URI 경로 모두 기본 배경 화면으로 처리된다.
 */
export default function Avatar({ size = defulatSize, path }: Iavatar) {
  const { defaultStyle } = useStyle(size);

  // 빈 문자열인 경우
  if (!path) return <RneAvatar size={size} containerStyle={defaultStyle} />;

  return <RneAvatar size={size} rounded source={{ uri: path }} />;
}
