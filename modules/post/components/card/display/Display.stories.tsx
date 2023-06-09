import { ComponentMeta } from '@storybook/react-native';
import Display from './Display';
import useCachedResources from '@app/hooks/useCachedResources';
import ThemeProvider from '@shared/components/ThemeProvider';

type Meta = ComponentMeta<typeof Display>;

export default {
  title: 'Display',
  component: Display,
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
} as Meta;

export const GroupDisplay: Meta = {
  args: {
    name: 'group',
    children: '999명',
    disabled: false,
  },
};

export const ConfirmedDisplay: Meta = {
  args: {
    name: 'check-circle',
    children: '확정',
    disabled: false,
  },
};

export const UnConfirmedDisplay: Meta = {
  args: {
    name: 'check-circle',
    children: '미확정',
    disabled: true,
  },
};
