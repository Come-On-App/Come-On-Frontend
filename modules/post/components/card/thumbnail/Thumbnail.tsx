import React from 'react';
import { Card } from '@rneui/themed';

import useStyles from './style';
import { IThumbnail } from './type';

export default function Thumbnail({ uri, children }: IThumbnail) {
  const { ImageContianer } = useStyles();

  return (
    <Card.Image style={ImageContianer} source={{ uri }}>
      {children}
    </Card.Image>
  );
}
