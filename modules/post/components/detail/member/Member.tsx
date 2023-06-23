import { View } from 'react-native';
import React from 'react';

import Avatar from '@shared/components/avatar/Avatar';
import Font from '@shared/components/font/Font';
import { Imember } from './type';
import useStyles from './style';

export default function Member({ user }: Imember) {
  const { path, name } = {
    path: user.profileImageUrl ?? '',
    name: user.nickname ?? '',
  };
  const { outterContainer, innerContainer, font } = useStyles();

  return (
    <View style={outterContainer}>
      <View style={innerContainer}>
        <Avatar path={path} />
        <Font style={font} numberOfLines={1}>
          {name}
        </Font>
      </View>
    </View>
  );
}
