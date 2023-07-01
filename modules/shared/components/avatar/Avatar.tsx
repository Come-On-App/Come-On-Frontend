import React from 'react';
import { Avatar as RneAvatar } from '@rneui/themed';

import TestId from '@shared/constants/testIds';
import { relativeSizeConverter } from '@shared/utils/utils';
import { Iavatar, IbadgedAvatar } from './type';
import useStyle from './style';

const DEFAULT_AVATAR_SIZE = relativeSizeConverter(40);
const DEFAULT_BADGE_SIZE = relativeSizeConverter(20);

/**
 * 빈 문자열, 잘못된 URI 경로 모두 기본 배경 화면으로 처리된다.
 */
export default function Avatar({
  size = DEFAULT_AVATAR_SIZE,
  path,
  children,
  containerStyle,
}: Iavatar) {
  const { defaultStyle } = useStyle(size);

  // 빈 문자열인 경우
  if (!path)
    return (
      <RneAvatar size={size} containerStyle={[defaultStyle, containerStyle]}>
        {children}
      </RneAvatar>
    );

  return (
    <RneAvatar
      size={size}
      rounded
      source={{ uri: path }}
      containerStyle={[defaultStyle, containerStyle]}
    >
      {children}
    </RneAvatar>
  );
}

export function BadgedAvatar({
  path,
  size,
  badgeName,
  badgeSize = DEFAULT_BADGE_SIZE,
}: IbadgedAvatar) {
  const { badgeColor, defaultBadgeStyle } = useStyle();

  return (
    <Avatar
      path={path}
      size={size}
      containerStyle={{ backgroundColor: undefined }}
    >
      <RneAvatar.Accessory
        testID={TestId.shared.avatar.badge}
        size={badgeSize}
        name={badgeName}
        color={badgeColor.color}
        style={defaultBadgeStyle}
      />
    </Avatar>
  );
}
