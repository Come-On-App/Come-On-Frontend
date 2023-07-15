import { ComponentMeta, ComponentStory } from '@storybook/react-native';

import InvitationModal from './Modal';
import {
  mockInvitationModal1,
  mockInvitationModal2,
  mockInvitationModal3,
  mockInvitationModal4,
  mockInvitationModal5,
} from '@post/mocks/invitationModal';
import { useState } from 'react';

type Meta = ComponentMeta<typeof InvitationModal>;

export default {
  title: 'Invitation - Modal',
  component: InvitationModal,
} as Meta;

type InvitationModalStory = ComponentStory<typeof InvitationModal>;

export const Loading: InvitationModalStory = () => {
  const [isVisible, setVisible] = useState(true);

  return (
    <InvitationModal
      {...mockInvitationModal1}
      isVisible={isVisible}
      onPressLeft={() => setVisible(false)}
    />
  );
};

export const Expiration: InvitationModalStory = () => {
  const [isVisible, setVisible] = useState(true);

  return (
    <InvitationModal
      {...mockInvitationModal2}
      isVisible={isVisible}
      onPressLeft={() => setVisible(false)}
    />
  );
};

export const Created: InvitationModalStory = () => {
  const [isVisible, setVisible] = useState(true);

  return (
    <InvitationModal
      {...mockInvitationModal3}
      isVisible={isVisible}
      onPressLeft={() => setVisible(false)}
    />
  );
};

export const Copied: InvitationModalStory = () => {
  const [isVisible, setVisible] = useState(true);

  return (
    <InvitationModal
      {...mockInvitationModal4}
      isVisible={isVisible}
      onPressLeft={() => setVisible(false)}
    />
  );
};

export const Failed: InvitationModalStory = () => {
  const [isVisible, setVisible] = useState(true);

  return (
    <InvitationModal
      {...mockInvitationModal5}
      isVisible={isVisible}
      onPressLeft={() => setVisible(false)}
    />
  );
};
