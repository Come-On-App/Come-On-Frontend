import { ComponentMeta, ComponentStory } from '@storybook/react-native';

import MeetingPostModifier from './MeetingPostModifier';
import { rest } from 'msw';
import { BASE_URL } from '@app/api/axiosInstance';
import PostNavigator from '@post/navigation/PostNavigator';

type Meta = ComponentMeta<typeof MeetingPostModifier>;

export default {
  title: 'Screens',
  component: MeetingPostModifier,
  decorators: [(Story) => <Story />],
} as Meta;

type MeetingPostCreatorStory = ComponentStory<typeof MeetingPostModifier>;

export const MeetingPostModification: MeetingPostCreatorStory = () => {
  return <PostNavigator initialRouteName="MeetingPostModification" />;
};

export const MeetingPostModificationLoading: MeetingPostCreatorStory = () => {
  return <PostNavigator initialRouteName="MeetingPostModification" />;
};

MeetingPostModificationLoading.parameters = {
  msw: {
    handlers: [
      rest.get(`${BASE_URL}/api/v2/meetings/:meetingId`, (_req, res, ctx) => {
        return res(ctx.delay('infinite'));
      }),
    ],
  },
};
