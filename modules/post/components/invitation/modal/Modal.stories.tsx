import { ComponentMeta } from '@storybook/react-native';

import FontThemeProvider from '@shared/provider/FontProvider';
import InvitationModal from './Modal';
import {
  mockInvitationModal1,
  mockInvitationModal2,
  mockInvitationModal3,
  mockInvitationModal4,
} from '@post/mocks/invitationModal';

type Meta = ComponentMeta<typeof InvitationModal>;

export default {
  title: 'Invitation - Modal',
  component: InvitationModal,
  decorators: [
    (Story) => (
      <FontThemeProvider>
        <Story />
      </FontThemeProvider>
    ),
  ],
} as Meta;

export const Generating: Meta = {
  args: {
    ...mockInvitationModal1,
  },
};

export const Expiration: Meta = {
  args: {
    ...mockInvitationModal2,
  },
};

export const Created: Meta = {
  args: {
    ...mockInvitationModal3,
  },
};

export const Copied: Meta = {
  args: {
    ...mockInvitationModal4,
  },
};
