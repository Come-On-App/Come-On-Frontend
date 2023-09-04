import { GetMeetingMemberMeResponse } from '@post/api/v2/type';
import { users } from './user';

export const meetingMemberMeResponse = {
  1: {
    memberId: 1,
    userId: users[0].userId,
    nickname: users[0].nickname,
    profileImageUrl: users[0].profileImageUrl,
    memberRole: 'HOST',
  },
  2: {
    memberId: 2,
    userId: users[0].userId,
    nickname: users[0].nickname,
    profileImageUrl: users[0].profileImageUrl,
    memberRole: 'PARTICIPANT',
  },
  3: {
    memberId: 3,
    userId: users[0].userId,
    nickname: users[0].nickname,
    profileImageUrl: users[0].profileImageUrl,
    memberRole: 'HOST',
  },
  4: {
    memberId: 4,
    userId: users[0].userId,
    nickname: users[0].nickname,
    profileImageUrl: users[0].profileImageUrl,
    memberRole: 'PARTICIPANT',
  },
} as {
  [Key in string]: GetMeetingMemberMeResponse;
};
