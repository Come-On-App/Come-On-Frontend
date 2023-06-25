import { View } from 'react-native';
import { ComponentMeta, ComponentStory } from '@storybook/react-native';

import { FontLoader } from '@shared/components/ThemeProvider';
import TopHeading from './TopHeading';

type Meta = ComponentMeta<typeof TopHeading>;

export default {
  title: 'Card - TopHeading',
  component: TopHeading,
  decorators: [
    (Story) => (
      <FontLoader>
        <View style={{ margin: 10, backgroundColor: 'grey', borderRadius: 10 }}>
          <Story />
        </View>
      </FontLoader>
    ),
  ],
} as Meta;

export const Default: Meta = {
  args: {
    people: 123,
    isDecided: false,
  },
};
