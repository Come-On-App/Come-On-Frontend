import { ComponentMeta } from '@storybook/react-native';

import { FontLoader } from '@shared/components/ThemeProvider';
import SearchAndCreateBar from './SearchAndCreateBar';
import generateNavigationDecorator from '@shared/mocks/StoryBookStack';

const NavigationDecorator = generateNavigationDecorator('MeetingPostCreation');

type Meta = ComponentMeta<typeof SearchAndCreateBar>;

export default {
  title: 'SearchAndCreateBar',
  component: SearchAndCreateBar,
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
