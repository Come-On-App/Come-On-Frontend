import { ComponentMeta } from '@storybook/react-native';

import { FontLoader } from '@shared/components/ThemeProvider';
import CardList from './CardList';

const path1 =
  'https://images.unsplash.com/photo-1682687220067-dced9a881b56?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1550&q=80';

const path2 =
  'https://plus.unsplash.com/premium_photo-1685316143415-7a17667e3829?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80';

const path3 =
  'https://images.unsplash.com/photo-1682686581295-7364cabf5511?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80';

type Meta = ComponentMeta<typeof CardList>;

export default {
  title: 'CardList',
  component: CardList,
  decorators: [
    (Story) => (
      <FontLoader>
        <Story />
      </FontLoader>
    ),
  ],
} as Meta;

export const Default: Meta = {
  args: {
    payloads: [
      {
        uri: path1,
        people: 30,
        isDecided: false,
        title: '물개들의 모임',
        subTitle: {
          userName: '여행마스터',
          range: {
            startFrom: '2024-02-10',
            endTo: '2024-02-11',
          },
        },
      },
      {
        uri: path2,
        people: 2,
        isDecided: true,
        title: '딸기 모임',
        subTitle: {
          userName: 'bang23',
          range: {
            startFrom: '2023-06-10',
            endTo: '2023-06-20',
          },
        },
      },
      {
        uri: path3,
        people: 23,
        isDecided: true,
        title: '수박 모임',
        subTitle: {
          userName: 'Rich',
          range: {
            startFrom: '2022-06-12',
            endTo: '2022-12-22',
          },
        },
      },
    ],
  },
};
