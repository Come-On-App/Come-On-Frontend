import { View } from 'react-native';
import { ComponentMeta } from '@storybook/react-native';

import GoogleButtonCompoent from './Google';

type Meta = ComponentMeta<typeof GoogleButtonCompoent>;

export default {
  title: 'Auth',
  component: GoogleButtonCompoent,
  decorators: [
    (Story) => (
      <View style={{ alignItems: 'center' }}>
        <Story />
      </View>
    ),
  ],
} as Meta;

export const GoogleButton: Meta = {};
