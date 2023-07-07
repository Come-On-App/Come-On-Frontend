import { View } from 'react-native';
import { ComponentMeta, ComponentStory } from '@storybook/react-native';

import FontThemeProvider from '@shared/provider/FontProvider';
import IconButton from './IconButton';

type Meta = ComponentMeta<typeof IconButton>;

const IconButtonMeta: ComponentMeta<typeof IconButton> = {
  title: 'IconButton',
  component: IconButton,
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
    onPress: { action: 'pressed the button' },
    color: {
      control: {
        type: 'color',
      },
    },
    _pressed: {
      type: 'boolean',
    },
    size: {
      type: 'number',
    },
  },
};

export default IconButtonMeta;

type IconButtonStory = ComponentStory<typeof IconButton>;

export const Default: IconButtonStory = (args) => {
  return (
    <>
      <IconButton {...args} name="more-vert" />
      <IconButton {...args} name="add" />
    </>
  );
};

Default.args = {
  color: '#a819b9',
  size: 50,
};

export const Pressed: Meta = {
  args: {
    name: 'more-vert',
    _pressed: true,
    color: '#a819b9',
    size: 50,
  },
};
