import { ComponentMeta } from '@storybook/react-native';

import Font from './Font';
import ThemeProvider from '../ThemeProvider';
import useCachedResources from '@shared/hooks/useCachedResources';

type Meta = ComponentMeta<typeof Font>;

const LoremIpsum =
  '"The quick brown fox jumps over the lazy dog"\n날쌘 갈색 여우가 게으른 개를 뛰어넘는다.\n🐶🥹🍏\n1234567890\n~!@#$%^&*()';

export default {
  title: 'Font',
  component: Font,
  decorators: [
    (Story) => {
      const isLoadingComplete = useCachedResources();

      if (!isLoadingComplete) {
        return null;
      }

      return (
        <ThemeProvider>
          <Story />
        </ThemeProvider>
      );
    },
  ],
  args: {
    children: LoremIpsum,
  },
} as Meta;

export const PretendardRegular: Meta = {
  args: {
    children: LoremIpsum,
    bold: false,
  },
};

export const PretendardBold: Meta = {
  args: {
    children: LoremIpsum,
    bold: true,
  },
};

export const withStyle: Meta = {
  args: {
    children: LoremIpsum,
    bold: false,
    style: {
      fontSize: 24,
      color: 'powderblue',
    },
  },
};
