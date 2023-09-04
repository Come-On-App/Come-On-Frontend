import { ComponentMeta } from '@storybook/react-native';

import Component from './Participants';

type Meta = ComponentMeta<typeof Component>;

export default {
  title: 'Detail - Participants',
  component: Component,
} as Meta;

export const Participants: Meta = {
  args: {
    id: 0,
  },
};
