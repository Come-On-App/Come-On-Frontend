import { ComponentMeta, ComponentStory } from '@storybook/react-native';

import MeetingPostModifier from './MeetingPostModifier';
import { NavigationContainer } from '@react-navigation/native';

type Meta = ComponentMeta<typeof MeetingPostModifier>;

export default {
  title: 'Screens',
  component: MeetingPostModifier,
  decorators: [
    (Story) => (
      <NavigationContainer>
        <Story />
      </NavigationContainer>
    ),
  ],
} as Meta;

type MeetingPostCreatorStory = ComponentStory<typeof MeetingPostModifier>;

export const MeetingPostModification: MeetingPostCreatorStory = (args) => {
  return (
    <MeetingPostModifier
      {...args}
      route={{ params: { id: 10 }, key: '0', name: 'MeetingPostModification' }}
    />
  );
};
