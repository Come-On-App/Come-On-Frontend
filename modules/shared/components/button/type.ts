import { IconName } from '../icon/type';

export interface IiconButton {
  onPress: () => void;
  color: string;
  size: number;
  name: IconName;
  _pressed?: boolean;
}
