import React from 'react';
import { Card } from '@rneui/themed';

import { View } from 'react-native';
import useStyles from './style';
import { ICardTopInfo, IThumbnail } from './type';

/**
 * 썸네일 상단 컴포넌트
 */
function ThumbnailTop({ children }: ICardTopInfo) {
  const { TopContainer } = useStyles();

  return <View style={TopContainer}>{children}</View>;
}

export default function Thumbnail({ uri, children }: IThumbnail) {
  const { ImageContianer } = useStyles();

  return (
    <Card.Image style={ImageContianer} source={{ uri }}>
      <ThumbnailTop>{children}</ThumbnailTop>
    </Card.Image>
  );
}
