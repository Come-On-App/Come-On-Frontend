import React from 'react';
import { Card } from '@rneui/themed';

import useStyles from './style';
import { IThumbnail } from './type';

export default function Thumbnail({ uri, children }: IThumbnail) {
  const { contianer } = useStyles();

  return (
    <Card.Image style={contianer} source={{ uri }}>
      {children}
    </Card.Image>
  );
}
