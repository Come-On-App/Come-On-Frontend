import { createTheme } from '@rneui/themed';

export const theme = createTheme({
  lightColors: {
    primary: '#337FFE',
    secondary: '#FFC724',
    warning: '#F05E51',
    info: '#24ABE4',
    success: '#20BD4A',
  },
  darkColors: {},
  mode: 'light',
  grayscale: {
    '900': '#212121',
    '800': '#424242',
    '700': '#616161',
    '600': '#757575',
    '500': '#9E9E9E',
    '400': '#BDBDBD',
    '300': '#E0E0E0',
    '200': '#EEEEEE',
    '100': '#F5F5F5',
    '50': '#FAFAFA',
  },
  textStyles: {
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
  components: {
    Text: props => ({
      style: {
        fontWeight: props.bold ? '700' : 'normal',
      },
    }),
  },
});
const tintColorLight = '#2f95dc';
const tintColorDark = '#fff';

export default {
  light: {
    text: '#000',
    background: '#fff',
    tint: tintColorLight,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#fff',
    background: '#000',
    tint: tintColorDark,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorDark,
  },
};
