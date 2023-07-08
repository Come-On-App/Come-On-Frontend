import { ComponentMeta } from '@storybook/react-native';

import FontThemeProvider from '@shared/provider/FontProvider';
import LoadingCardList from './LoadingCardList';

type Meta = ComponentMeta<typeof LoadingCardList>;

export default {
  title: 'CardList',
  component: LoadingCardList,
  decorators: [
    (Story) => (
      <FontThemeProvider>
        <Story />
      </FontThemeProvider>
    ),
  ],
} as Meta;

export const Loading: Meta = {
  args: {},
};
