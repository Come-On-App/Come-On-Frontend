import { ComponentMeta } from '@storybook/react-native';

import FontThemeProvider from '@shared/provider/FontProvider';
import Card from './Card';

const path =
  'https://images.unsplash.com/photo-1682687220067-dced9a881b56?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1550&q=80';

type Meta = ComponentMeta<typeof Card>;

export default {
  title: 'Card',
  component: Card,
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
    payload: {
      uri: path,
      people: 30,
      isDecided: false,
      title: '물개들의 모임',
      subTitle: {
        userName: '여행마스터',
        range: {
          startFrom: '2023-06-10',
          endTo: '2023-06-20',
        },
      },
    },
  },
};
