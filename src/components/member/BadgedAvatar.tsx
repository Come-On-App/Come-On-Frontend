import React from 'react';
import { Avatar, makeStyles } from '@rneui/themed';

import type { BadgedAvatarProps } from '../../types';

export default function BadgedAvatar({
  size,
  path,
  badge: { icon, backgroundColor },
}: BadgedAvatarProps) {
  const styles = useStyles(backgroundColor);

  return (
    <Avatar size={size} rounded source={{ uri: path }}>
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
