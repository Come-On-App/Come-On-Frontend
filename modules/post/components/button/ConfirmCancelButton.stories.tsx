import { View } from 'react-native';
import { ComponentMeta } from '@storybook/react-native';

import { FontLoader } from '@shared/components/ThemeProvider';
import ConfirmCancelButton from './ConfirmCancelButton';

type Meta = ComponentMeta<typeof ConfirmCancelButton>;

export default {
  title: 'Creation - ConfirmCancelButton',
  component: ConfirmCancelButton,
  decorators: [
    (Story) => (
      <FontLoader>
        <View style={{ margin: 10 }}>
          <Story />
        </View>
      </FontLoader>
    ),
  ],
  argTypes: {
    onCancelHandler: {
      action: 'onCancelHandler',
    },
    onConfirmlHandler: {
      action: 'onConfirmlHandler',
    },
  },
} as Meta;

export const Default: Meta = {};
