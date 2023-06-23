import { View } from 'react-native';
import React from 'react';

import Avatar from '@shared/components/avatar/Avatar';
import Font from '@shared/components/font/Font';
import { Imember } from './type';
import useStyles from './style';

export default function Member({ nickname, profileImageUrl }: Imember) {
  const { container, font } = useStyles();
  const { path, name } = {
    path: profileImageUrl ?? '',
    name: nickname ?? '',
  };

  return (
    <View style={container}>
      <Avatar path={path} />
      <Font style={font} numberOfLines={1}>
        {name}
      </Font>
    </View>
  );
}
