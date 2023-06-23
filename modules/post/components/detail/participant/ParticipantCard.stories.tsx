import { ComponentMeta } from '@storybook/react-native';

import { FontLoader } from '@shared/components/ThemeProvider';
import mockMembers from '@post/mocks/members';
import Participants from './ParticipantCard';

type Meta = ComponentMeta<typeof Participants>;

const IconButtonMeta: ComponentMeta<typeof Participants> = {
  title: 'Detail - ParticipantCard',
  component: Participants,
  decorators: [
    (Story) => (
      <FontLoader>
        <Story />
      </FontLoader>
    ),
  ],
};

export default IconButtonMeta;

export const Defualt: Meta = {
  args: {
    users: mockMembers,
  },
};
