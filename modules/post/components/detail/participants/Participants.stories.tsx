import { ComponentMeta } from '@storybook/react-native';

import { FontThemeProvider } from '@shared/components/ThemeProvider';
import mockMembers from '@post/mocks/members';
import Component from './Participants';

type Meta = ComponentMeta<typeof Component>;

export default {
  title: 'Detail - Participants',
  component: Component,
  decorators: [
    (Story) => (
      <FontThemeProvider>
        <Story />
      </FontThemeProvider>
    ),
  ],
} as Meta;

export const Participants: Meta = {
  args: {
    users: mockMembers,
  },
};
