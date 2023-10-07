import { View } from 'react-native';
import { ComponentMeta } from '@storybook/react-native';

import AppleButtonCompoent from './Apple';

type Meta = ComponentMeta<typeof AppleButtonCompoent>;

export default {
  title: 'Auth',
  component: AppleButtonCompoent,
  decorators: [
    (Story) => (
      <View style={{ alignItems: 'center' }}>
        <Story />
      </View>
    ),
  ],
} as Meta;

export const AppleButton: Meta = {};
