import { View } from 'react-native';
import React from 'react';

import Font from '@shared/components/font/Font';
import Avatar from '@shared/components/avatar/Avatar';
import { IVoteUser } from './type';
import useStyles from './style';

const MAX_NUMBER_OF_LINES = 1;

export default function VoteUser({ userName, userAvatarPath }: IVoteUser) {
  const { avatarStyle, viewContainer, nicknameContainer } = useStyles();

  return (
    <View style={viewContainer}>
      <Avatar path={userAvatarPath} containerStyle={avatarStyle} />
      <View style={nicknameContainer}>
        <Font numberOfLines={MAX_NUMBER_OF_LINES}>{userName}</Font>
      </View>
    </View>
  );
}
