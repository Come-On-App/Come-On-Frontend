import { ComponentMeta } from '@storybook/react-native';

import FontThemeProvider from '@shared/provider/FontProvider';
import PostInput from './PostInput';

type Meta = ComponentMeta<typeof PostInput>;

export default {
  title: 'PostInput',
  component: PostInput,
  decorators: [
    (Story) => (
      <FontThemeProvider>
        <Story />
      </FontThemeProvider>
    ),
  ],
} as Meta;

export const Default: Meta = {
  args: {
    title: '제목',
    lengthMax: 10,
    multiline: false,
    placeholder: 'placeholder',
    onInput: console.log,
    dividerPosition: 'both',
    errorMessage: '',
    isDataLoading: false,
  },
};
