import { View } from 'react-native';
import { ComponentMeta, ComponentStory } from '@storybook/react-native';

import { FontLoader } from '@shared/components/ThemeProvider';
import IconButton from './IconButton';

const IconButtonMeta: ComponentMeta<typeof IconButton> = {
  title: 'IconButton',
  component: IconButton,
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
    color: {
      control: {
        type: 'color',
      },
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
