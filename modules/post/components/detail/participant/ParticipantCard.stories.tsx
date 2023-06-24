import { ComponentMeta } from '@storybook/react-native';

import { FontLoader } from '@shared/components/ThemeProvider';
import mockMembers from '@post/mocks/members';
import Component from './ParticipantCard';

type Meta = ComponentMeta<typeof Component>;

export default {
  title: 'Detail - Participant',
  component: Component,
  decorators: [
    (Story) => (
      <FontLoader>
        <Story />
      </FontLoader>
    ),
  ],
} as Meta;

export const ParticipantCard: Meta = {
  args: {
    users: mockMembers,
  },
};
