import { MaterialIcons } from '@expo/vector-icons';

export type IconName = React.ComponentProps<typeof MaterialIcons>['name'];

export interface Iicon {
  name: IconName;
  color: string;
  size: number;
}
