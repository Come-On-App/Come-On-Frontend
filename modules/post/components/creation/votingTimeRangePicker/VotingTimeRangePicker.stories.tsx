import { View } from 'react-native';
import { ComponentMeta } from '@storybook/react-native';

import { FontLoader } from '@shared/components/ThemeProvider';
import VotingTimeRangePicker from './VotingTimeRangePicker';

type Meta = ComponentMeta<typeof VotingTimeRangePicker>;

export default {
  title: 'Creation - VotingTimeRangePicker',
  component: VotingTimeRangePicker,
  decorators: [
    (Story) => (
      <FontLoader>
        <View style={{ paddingHorizontal: 15 }}>
          <Story />
        </View>
      </FontLoader>
    ),
  ],
} as Meta;

export const Default: Meta = {
  args: {},
};
