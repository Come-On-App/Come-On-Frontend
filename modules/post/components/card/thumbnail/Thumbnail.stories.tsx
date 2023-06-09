import { View } from 'react-native';
import { ComponentMeta, ComponentStory } from '@storybook/react-native';

import Thumbnail from './Thumbnail';
import { FontLoader } from '@shared/components/ThemeProvider';
import Display from '../display/Display';

const path =
  'https://images.unsplash.com/photo-1682687220067-dced9a881b56?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1550&q=80';

type Meta = ComponentMeta<typeof Thumbnail>;

export default {
  title: 'Card - Thumbnail',
  component: Thumbnail,
  decorators: [
    (Story) => (
      <FontLoader>
        <View style={{ margin: 10 }}>
          <Story />
        </View>
      </FontLoader>
    ),
  ],
  args: {
    uri: path,
  },
} as Meta;

export const Default: Meta = {
  args: {
    uri: path,
  },
};

type ThumbnailStory = ComponentStory<typeof Thumbnail>;

// TODO: 자식 컴포넌트화 시키기
export const WithTopComponent: ThumbnailStory = (args) => (
  <Thumbnail uri={args.uri}>
    <View style={{ flexDirection: 'row' }}>
      <Display name="groups">999명</Display>
      <Display name="check-circle">확정</Display>
      <Display name="check-circle" disabled>
        미확정
      </Display>
    </View>
  </Thumbnail>
);
