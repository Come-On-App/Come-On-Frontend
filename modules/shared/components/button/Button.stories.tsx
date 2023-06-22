import { View } from 'react-native';
import { ComponentMeta } from '@storybook/react-native';

import { FontLoader } from '@shared/components/ThemeProvider';
import Button from './Button';

type Meta = ComponentMeta<typeof Button>;

const IconButtonMeta: ComponentMeta<typeof Button> = {
  title: 'Button',
  component: Button,
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
    onPress: { action: 'pressed the button' },
    backgroundColor: {
      control: {
        type: 'color',
      },
    },
  },
  args: {
    backgroundColor: '#337FFE',
  },
};

export default IconButtonMeta;

export const Defualt: Meta = {
  args: {
    title: 'button',
    bold: false,
  },
};

export const Bold: Meta = {
  args: {
    title: 'button',
    bold: true,
  },
};
