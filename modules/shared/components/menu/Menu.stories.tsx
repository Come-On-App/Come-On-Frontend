import { ComponentMeta } from '@storybook/react-native';

import { FontLoader } from '@shared/components/ThemeProvider';
import Menu from './Menu';
import { Text, View } from 'react-native';
import Icon from '../icon/Icon';

const list = [
  {
    name: 'Menu Item 1',
    onPress: () => console.log('click Menu Item 1'),
  },
  {
    name: 'Menu Item 2',
    onPress: () => console.log('click Menu Item 2'),
  },
  {
    name: 'Menu Item 3',
    onPress: () => console.log('click Menu Item 3'),
  },
  {
    name: 'Menu Item 4',
    onPress: () => console.log('click Menu Item 4'),
  },
];

type Meta = ComponentMeta<typeof Menu>;

export default {
  title: 'Menu',
  decorators: [
    (Story) => (
      <View
        style={{
          height: '100%',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Story />
      </View>
    ),
  ],
  component: Menu,
} as Meta;

export const Default: Meta = {
  decorators: [
    (Story) => (
      <Story
        args={{
          list,
          anchor: <Icon name="more-vert" size={30} color="pink" />,
        }}
      />
    ),
  ],
};

export const WithText: Meta = {
  decorators: [
    (Story) => (
      <Story
        args={{
          list,
          anchor: <Text>Click Me!</Text>,
        }}
      />
    ),
  ],
};
