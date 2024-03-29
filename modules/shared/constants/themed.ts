/* eslint-disable padding-line-between-statements */
import { createTheme } from '@rneui/themed';

declare module '@rneui/themed' {
  export interface Theme {
    font: typeof font;
  }
}

const lightColors = {
  primary: '#337FFE',
  secondary: '#FFC724',
  warning: '#F05E51',
  info: '#24ABE4',
  success: '#20BD4A',
} as const;

const darkColors = {
  primary: '#1145AA',
  secondary: '#AA9E0B',
  warning: '#A03127',
  info: '#0E7BAA',
  success: '#0B8A36',
} as const;

const font = {
  grayscale: {
    900: '#212121',
    800: '#424242',
    700: '#616161',
    600: '#757575',
    500: '#9E9E9E',
    400: '#BDBDBD',
    300: '#E0E0E0',
    200: '#EEEEEE',
    100: '#F5F5F5',
    50: '#FAFAFA',
    0: '#FFFFFF',
  },
  type: {
    title1: {
      fontSize: 26,
      lineHeight: 34,
    },
    title2: {
      fontSize: 22,
      lineHeight: 28,
    },
    title3: {
      fontSize: 18,
      lineHeight: 24,
    },
    title4: {
      fontSize: 16,
      lineHeight: 22,
    },
    body1: {
      fontSize: 14,
      lineHeight: 20,
    },
    body2: {
      fontSize: 13,
      lineHeight: 19,
    },
    body3: {
      fontSize: 12,
      lineHeight: 18,
    },
    caption: {
      fontSize: 10,
      lineHeight: 14,
    },
  },
} as const;

export const theme = createTheme({
  lightColors,
  darkColors,
  font,
});
