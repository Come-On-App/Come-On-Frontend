import { View } from 'react-native';
import { ComponentMeta } from '@storybook/react-native';

import FontThemeProvider from '@shared/provider/FontProvider';
import ConfirmCancelButton from './ConfirmCancelButton';

type Meta = ComponentMeta<typeof ConfirmCancelButton>;

export default {
  title: 'ConfirmCancelButton',
  component: ConfirmCancelButton,
  decorators: [
    (Story) => (
      <FontThemeProvider>
        <View style={{ margin: 10 }}>
          <Story />
        </View>
      </FontThemeProvider>
    ),
  ],
  argTypes: {
    onPressLeft: {
      action: 'onPressLeft',
    },
    onPressRight: {
      action: 'onPressRight',
    },
  },
} as Meta;

export const Default: Meta = {};
