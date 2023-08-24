import { IconName } from '@shared/components/icon/type';
import { DividerPosition } from '@shared/components/layout/type';

export interface IpolicyInfo {
  title: string;
  showIcon?: boolean;
  onPress?: () => void;
  position?: DividerPosition;
  iconName?: IconName;
}

export interface IpressedStyle {
  pressed: boolean;
}
