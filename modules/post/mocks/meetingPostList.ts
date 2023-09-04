import { ICardInfo } from '@post/components/card/type';
import image from './image';

export default [
  {
    uri: image(),
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
    uri: image(),
    people: 2,
    isDecided: true,
    title: '딸기 모임',
    subTitle: {
      userName: 'banana',
      range: {
        startFrom: '2023-06-10',
        endTo: '2023-06-20',
      },
    },
  },
  {
    uri: image(),
    people: 23,
    isDecided: true,
    title: '수박 모임',
    subTitle: {
      userName: 'apple',
      range: {
        startFrom: '2022-06-12',
        endTo: '2022-12-22',
      },
    },
  },
  {
    uri: image(),
    people: 1,
    isDecided: true,
    title: '리치 모임',
    subTitle: {
      userName: 'Rich',
      range: {
        startFrom: '2022-08-12',
        endTo: '2022-08-22',
      },
    },
  },
] as ICardInfo[];
