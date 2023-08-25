import { ComponentMeta } from '@storybook/react-native';

import Component from './MembersSkeleton';

type Meta = ComponentMeta<typeof Component>;

export default {
  title: 'Detail - MembersSkeleton',
  component: Component,
} as Meta;

export const MembersSkeleton: Meta = {};
