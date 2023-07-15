import { ComponentMeta } from '@storybook/react-native';

import FontThemeProvider from '@shared/provider/FontProvider';
import DB from '@post/mocks/meetingPostLists';
import ServerError from './ServerError';

type Meta = ComponentMeta<typeof ServerError>;

export default {
  title: 'CardList',
  component: ServerError,
  decorators: [
    (Story) => (
      <FontThemeProvider>
        <Story />
      </FontThemeProvider>
    ),
  ],
} as Meta;

export const Error: Meta = {
  args: {},
};
