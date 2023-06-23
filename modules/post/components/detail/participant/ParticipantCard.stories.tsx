import { ComponentMeta } from '@storybook/react-native';

import { FontLoader } from '@shared/components/ThemeProvider';
import mockMembers from '@post/mocks/members';
import Participants from './ParticipantCard';

type Meta = ComponentMeta<typeof Participants>;

export default {
  title: 'Detail - ParticipantCard',
  component: Participants,
  decorators: [
    (Story) => (
      <FontLoader>
        <Story />
      </FontLoader>
    ),
  ],
} as Meta;

export const Defualt: Meta = {
  args: {
    users: mockMembers,
  },
};
