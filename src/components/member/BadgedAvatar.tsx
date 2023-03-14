import React, { memo } from 'react';
import { Avatar, makeStyles } from '@rneui/themed';

import type { BadgedAvatarProps } from '@type/index';

function BadgedAvatar({
  size,
  path,
  onPress,
  badge: { icon, backgroundColor },
  containerStyle,
}: BadgedAvatarProps) {
  const styles = useStyles(backgroundColor);

  return (
    <Avatar
      size={size}
      rounded
      source={path ? { uri: path } : undefined}
      onPress={onPress}
      containerStyle={containerStyle}
    >
      <Avatar.Accessory
        style={styles.avatarAccessory}
        size={icon.size}
        color={icon.color}
        name={icon.iconName}
      />
    </Avatar>
  );
}

const useStyles = makeStyles((_theme, backgroundColor: string) => ({
  avatarAccessory: {
    backgroundColor,
    elevation: 0,
    borderWidth: 0,
    shadowOpacity: 0,
  },
}));

export default memo(BadgedAvatar);
