import { ComponentMeta, StoryFnReactReturnType } from '@storybook/react-native';

import { FontThemeProvider } from '@shared/components/ThemeProvider';
import VotingTimeRangePicker from './VotingTimeRangePicker';
import generateNavigationDecorator from '@shared/mocks/StoryBookStack';

const NavigationDecorator = generateNavigationDecorator('MeetingDateSelector');

type Meta = ComponentMeta<typeof VotingTimeRangePicker>;

export default {
  title: 'Creation - VotingTimeRangePicker',
  component: VotingTimeRangePicker,
  decorators: [
    NavigationDecorator,
    (Story) => (
      <FontThemeProvider>
        <Story />
      </FontThemeProvider>
    ),
  ],
} as Meta;

export const Default: Meta = {};
