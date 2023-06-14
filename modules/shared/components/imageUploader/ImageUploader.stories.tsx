import { View } from 'react-native';
import { ComponentMeta, ComponentStory } from '@storybook/react-native';

import { FontLoader } from '@shared/components/ThemeProvider';
import ImageUploader from './ImageUploader';

const uri =
  'https://images.unsplash.com/photo-1685789002226-66b99007e48d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80';

type Meta = ComponentMeta<typeof ImageUploader>;

export default {
  title: 'ImageUploader',
  component: ImageUploader,
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
    iconName: 'camera-alt',
    description: '사진을 등록해 주세요.',
  },
  argTypes: {
    onPress: { action: 'pressed the component' },
  },
} as Meta;

export const Default: Meta = {
  args: {
    iconName: 'camera-alt',
    description: '사진을 등록해 주세요.',
  },
};

export const WithImage: Meta = {
  args: {
    uri: uri,
  },
};

export const Loading: Meta = {
  args: {
    isLoading: true,
  },
};
