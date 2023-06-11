import { CardInfo } from '@post/components/card/type';

const path1 =
  'https://images.unsplash.com/photo-1682687220067-dced9a881b56?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1550&q=80';
const path2 =
  'https://plus.unsplash.com/premium_photo-1685316143415-7a17667e3829?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80';
const path3 =
  'https://images.unsplash.com/photo-1682686581295-7364cabf5511?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80';
const path4 =
  'https://images.unsplash.com/photo-1685789002226-66b99007e48d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80';

export default [
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
      userName: 'banana',
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
      userName: 'apple',
      range: {
        startFrom: '2022-06-12',
        endTo: '2022-12-22',
      },
    },
  },
  {
    uri: path4,
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
] as CardInfo[];
