import { ComponentMeta, StoryFnReactReturnType } from '@storybook/react-native';

import { FontLoader } from '@shared/components/ThemeProvider';
import VotingTimeRangePicker from './VotingTimeRangePicker';
import generateNavigationDecorator from '@shared/mocks/StoryBookStack';

const NavigationDecorator = generateNavigationDecorator('MeetingDateSelector', {
  paddingHorizontal: 15,
});

type Meta = ComponentMeta<typeof VotingTimeRangePicker>;

export default {
  title: 'Creation - VotingTimeRangePicker',
  component: VotingTimeRangePicker,
  decorators: [
    NavigationDecorator,
    (Story) => (
      <FontLoader>
        <Story />
      </FontLoader>
    ),
  ],
} as Meta;

export const Default: Meta = {};
