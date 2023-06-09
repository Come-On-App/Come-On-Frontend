import { IconName } from '@shared/components/icon/type';

export interface IDisplayIcon {
  name: IconName;
}

export interface IDisplay {
  name: IconName;
  children: React.ReactNode;
  disabled?: boolean;
}
