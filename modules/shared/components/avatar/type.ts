import type { ReactNode } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';

import type { IconName } from '../icon/type';

export interface Iavatar {
  path?: string;
  size?: number;
  containerStyle?: StyleProp<ViewStyle>;
  children?: ReactNode;
  isLoading?: boolean;
}

export interface IbadgedAvatar {
  path: string;
  badgeName: IconName;
  size?: number;
  badgeSize?: number;
}
