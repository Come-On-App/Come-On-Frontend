import { ComponentMeta } from '@storybook/react-native';

import Font from './Font';
import FontThemeProvider from '@shared/provider/FontProvider';

type Meta = ComponentMeta<typeof Font>;

const LoremIpsum =
  '"The quick brown fox jumps over the lazy dog"\n날쌘 갈색 여우가 게으른 개를 뛰어넘는다.\n🐶🥹🍏\n1234567890\n~!@#$%^&*()';

export default {
  title: 'Font',
  component: Font,
  decorators: [
    (Story) => (
      <FontThemeProvider>
        <Story />
      </FontThemeProvider>
    ),
  ],
  args: {
    children: LoremIpsum,
  },
} as Meta;

export const PretendardRegular: Meta = {
  args: {
    bold: false,
  },
};

export const PretendardBold: Meta = {
  args: {
    bold: true,
  },
};

export const withStyle: Meta = {
  args: {
    bold: false,
    style: {
      fontSize: 24,
      color: 'powderblue',
    },
  },
};
