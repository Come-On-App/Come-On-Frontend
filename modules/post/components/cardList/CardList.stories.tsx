import { ComponentMeta } from '@storybook/react-native';

import FontThemeProvider from '@shared/provider/FontProvider';
import mockMeetingPostList from '@post/mocks/meetingPostList';
import CardList from './CardList';

type Meta = ComponentMeta<typeof CardList>;

export default {
  title: 'CardList',
  component: CardList,
  decorators: [
    (Story) => (
      <FontThemeProvider>
        <Story />
      </FontThemeProvider>
    ),
  ],
} as Meta;

export const Default: Meta = {
  args: {
    payload: mockMeetingPostList,
  },
};
