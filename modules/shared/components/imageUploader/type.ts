import { IconName } from '../icon/type';

export interface IimageUploader {
  onPress: () => void;
  description: string;
  iconName?: IconName;
  uri?: string;
  isLoading?: boolean;
}
