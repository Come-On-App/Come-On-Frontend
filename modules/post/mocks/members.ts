import { GetMeetingMembersListResponse } from '@post/api/v2/type';

export default {
  contentsCount: 4,
  contents: [
    {
      memberId: 88,
      userId: 112,
      nickname: '차운우',
      profileImageUrl: 'https://picsum.photos/200/300',
      memberRole: 'HOST',
    },
    {
      memberId: 109,
      userId: 134,
      nickname: '쏭',
      profileImageUrl: 'https://picsum.photos/200/300',
      memberRole: 'PARTICIPANT',
    },
    {
      memberId: 111,
      userId: 155,
      nickname: 'user155',
      profileImageUrl: 'https://picsum.photos/200/300',
      memberRole: 'PARTICIPANT',
    },
    {
      memberId: 135,
      userId: 157,
      nickname: 'user157',
      profileImageUrl: 'https://picsum.photos/200/300',
      memberRole: 'PARTICIPANT',
    },
  ],
} as GetMeetingMembersListResponse;
