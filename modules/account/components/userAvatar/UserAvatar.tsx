import { View } from 'react-native';
import React from 'react';

import { BadgedAvatar } from '@shared/components/avatar/Avatar';
import TestId from '@shared/constants/testIds';
import { applyRelativeSizes } from '@shared/utils/utils';
import { IuserAvatar } from './type';

const BADGE_NAME = 'photo-camera';
const [AVATAR_SIZE, AVATAR_BADEG_SIZE] = applyRelativeSizes([100, 30]);

export default function UserAvatar({ path }: IuserAvatar) {
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
