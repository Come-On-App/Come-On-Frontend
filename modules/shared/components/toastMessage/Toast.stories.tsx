import { Button, View } from 'react-native';
import Toast from 'react-native-toast-message';
import { ComponentMeta, ComponentStory } from '@storybook/react-native';

import { toastConfig } from './Toast.config';

type Meta = ComponentMeta<typeof Toast>;

export default {
  title: 'Toast',
  component: Toast,
  decorators: [
    (Story) => (
      <>
        <View style={{ flex: 1 }}>
          <Story />
        </View>
        <Toast
          onPress={() => Toast.hide()}
          autoHide={false}
          config={toastConfig}
        />
      </>
    ),
  ],
} as Meta;

type ToastStory = ComponentStory<typeof Toast>;

export const Default: ToastStory = (arg) => {
  const showToast = () => {
    Toast.show({
      type: 'success',
      text1: 'Hello',
      text2: 'This is some something 👋',
    });
  };

  return <Button title="Show toast" onPress={showToast} />;
};

export const Info: ToastStory = (arg) => {
  const showToast = () => {
    Toast.show({
      type: 'info',
      text1: 'Hello',
      text2: 'This is some something 👋',
    });
  };

  return <Button title="Show toast" onPress={showToast} />;
};

export const Error: ToastStory = (arg) => {
  const showToast = () => {
    Toast.show({
      type: 'error',
      text1: 'Hello',
      text2: 'This is some something 👋',
    });
  };

  return <Button title="Show toast" onPress={showToast} />;
};
