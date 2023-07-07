import { View } from 'react-native';
import { ComponentMeta, ComponentStory } from '@storybook/react-native';

import FontThemeProvider from '@shared/provider/FontProvider';
import TopHeading from './TopHeading';

type Meta = ComponentMeta<typeof TopHeading>;

export default {
  title: 'Card - TopHeading',
  component: TopHeading,
  decorators: [
    (Story) => (
      <FontThemeProvider>
        <View style={{ margin: 10, backgroundColor: 'grey', borderRadius: 10 }}>
          <Story />
        </View>
      </FontThemeProvider>
    ),
  ],
} as Meta;

export const Default: Meta = {
  args: {
    people: 123,
    isDecided: false,
  },
};
