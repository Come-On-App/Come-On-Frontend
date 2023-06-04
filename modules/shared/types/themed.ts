import '@rneui/themed';
import { font } from '@shared/constants/themed';

declare module '@rneui/themed' {
  export interface Theme {
    font: typeof font;
  }
}
