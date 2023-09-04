import { View } from 'react-native';
import React from 'react';

import Avatar from '@shared/components/avatar/Avatar';
import Font from '@shared/components/font/Font';
import { Imember } from './type';
import useStyles from './style';

export default function Member({ nickname, profileImageUrl }: Imember) {
  const { container, font } = useStyles();

  return (
    <View style={container}>
      <Avatar path={profileImageUrl} />
      <Font style={font} numberOfLines={2}>
        {nickname}
      </Font>
    </View>
  );
}
