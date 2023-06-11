import { ComponentMeta } from '@storybook/react-native';

import { FontLoader } from '@shared/components/ThemeProvider';
import DB from '@post/screens/mockDB';
import CardList from './CardList';

type Meta = ComponentMeta<typeof CardList>;

export default {
  title: 'CardList',
  component: CardList,
  decorators: [
    (Story) => (
      <FontLoader>
        <Story />
      </FontLoader>
    ),
  ],
} as Meta;

export const Default: Meta = {
  args: {
    payloads: DB,
  },
};
