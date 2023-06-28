import { View } from 'react-native';
import { ComponentMeta, ComponentStory } from '@storybook/react-native';

import { FontLoader } from '@shared/components/ThemeProvider';
import CodeField from './CodeField';
import { useState } from 'react';

type Meta = ComponentMeta<typeof CodeField>;

export default {
  title: 'CodeField',
  component: CodeField,
  decorators: [
    (Story) => (
      <FontLoader>
        <View style={{ padding: 10 }}>
          <Story />
        </View>
      </FontLoader>
    ),
  ],
  args: {
    cellCount: 6,
  },
  argTypes: {
    cursorSymbol: {
      type: 'string',
    },
  },
} as Meta;

type CodeFieldStory = ComponentStory<typeof CodeField>;

export const Default: CodeFieldStory = (args) => {
  const [value, setValue] = useState(args.value);

  return <CodeField {...args} value={value} setValue={setValue} />;
};
