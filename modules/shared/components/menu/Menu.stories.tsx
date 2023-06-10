import { ComponentMeta, ComponentStory } from '@storybook/react-native';
import { Text, View } from 'react-native';

import Menu from './Menu';
import Icon from '../icon/Icon';
import { FontLoader } from '../ThemeProvider';

const list = [
  {
    name: 'Menu Item 1',
    onPress: () => {},
  },
  {
    name: 'Menu Item 2',
    onPress: () => {},
  },
  {
    name: 'Menu Item 3',
    onPress: () => {},
  },
  {
    name: 'Menu Item 4',
    onPress: () => {},
  },
];

type Meta = ComponentMeta<typeof Menu>;

export default {
  title: 'Menu',
  decorators: [
    (Story) => (
      <FontLoader>
        <View
          style={{
            height: '100%',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Story />
        </View>
      </FontLoader>
    ),
  ],
  component: Menu,
  args: {
    list,
  },
} as Meta;

type MenuStory = ComponentStory<typeof Menu>;

export const Default: MenuStory = (args) => {
  return (
    <Menu {...args} anchor={<Icon name="hardware" size={30} color="black" />} />
  );
};

export const WithText: MenuStory = (args) => {
  return <Menu {...args} anchor={<Text>Click Me!</Text>} />;
};
