import { mockMyInfo } from '@account/mocks/mockUser';
import image from './image';

export const users = [
  {
    userId: mockMyInfo.userId,
    nickname: mockMyInfo.nickname,
    profileImageUrl: mockMyInfo.profileImageUrl,
  },
  {
    userId: 2,
    nickname: '사용자2',
    profileImageUrl: image(),
  },
  {
    userId: 3,
    nickname: '사용자3',
    profileImageUrl: image(),
  },
  {
    userId: 4,
    nickname: '사용자4',
    profileImageUrl: image(),
  },
  {
    userId: 5,
    nickname: '사용자5',
    profileImageUrl: image(),
  },
  {
    userId: 6,
    nickname: '사용자6',
    profileImageUrl: image(),
  },
  {
    userId: 7,
    nickname: '사용자7',
    profileImageUrl: image(),
  },
  {
    userId: 8,
    nickname: '사용자8',
    profileImageUrl: image(),
  },
  {
    userId: 9,
    nickname: '사용자9',
    profileImageUrl: image(),
  },
  {
    userId: 10,
    nickname: '사용자10',
    profileImageUrl: image(),
  },
];
