import { ComponentMeta } from '@storybook/react-native';

import FontThemeProvider from '@shared/provider/FontProvider';
import EmptyCardList from './EmptyCardList';

type Meta = ComponentMeta<typeof EmptyCardList>;

export default {
  title: 'CardList',
  component: EmptyCardList,
  decorators: [
    (Story) => (
      <FontThemeProvider>
        <Story />
      </FontThemeProvider>
    ),
  ],
} as Meta;

export const Empty: Meta = {
  args: {
    type: 'empty',
  },
};

export const NoSearchResults: Meta = {
  args: {
    type: 'search',
  },
};
