import { View } from 'react-native';
import React from 'react';

import { BadgedAvatar } from '@shared/components/avatar/Avatar';
import TestId from '@shared/constants/testIds';
import { applyRelativeSizes } from '@shared/utils';
import { Skeleton } from '@rneui/themed';
import { IuserAvatar } from './type';

const BADGE_NAME = 'photo-camera';
const [AVATAR_SIZE, AVATAR_BADEG_SIZE] = applyRelativeSizes({
  avatarSize: 60,
  badgeSize: 20,
});

export default function UserAvatar({ path, isLoading }: IuserAvatar) {
  if (isLoading) {
    return <Skeleton circle width={AVATAR_SIZE} height={AVATAR_SIZE} />;
  }

  return (
    <View testID={TestId.account.avatar}>
      <BadgedAvatar
        badgeName={BADGE_NAME}
        path={path}
        size={AVATAR_SIZE}
        badgeSize={AVATAR_BADEG_SIZE}
      />
    </View>
  );
}
