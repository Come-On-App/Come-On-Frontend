import { ComponentMeta } from '@storybook/react-native';

import Component from './VotingStatus';

type Meta = ComponentMeta<typeof Component>;

export default {
  title: 'Detail - VotingStatusSlider',
  component: Component,
} as Meta;

export const Planner: Meta = {
  args: {
    dateString: '2023-08-28',
    isEnabled: true,
    totalMember: 5,
    voteCount: 4,
  },
};
