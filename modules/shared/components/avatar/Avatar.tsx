import React from 'react';
import { Avatar as RneAvatar, Skeleton } from '@rneui/themed';

import TestId from '@shared/constants/testIds';
import { relativeSizeConverter } from '@shared/utils';
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
  isLoading,
  onPress,
}: Iavatar) {
  const { defaultStyle } = useStyle(size);

  if (isLoading) {
    return (
      <Skeleton
        circle
        accessibilityHint="loading"
        width={defaultStyle.width}
        height={defaultStyle.height}
      />
    );
  }

  return (
    <RneAvatar
      size={size}
      onPress={onPress}
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
  onPress,
  isLoading,
  badgeSize = DEFAULT_BADGE_SIZE,
}: IbadgedAvatar) {
  const { badgeColor, defaultBadgeStyle } = useStyle();

  return (
    <Avatar
      path={path}
      size={size}
      isLoading={isLoading}
      onPress={onPress}
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
