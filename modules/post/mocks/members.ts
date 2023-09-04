import { users } from './user';
import { GetMeetingMembersListResponse } from '@post/api/v2/type';

const [ONE, TWO, THREE, FOUR] = [1, 2, 3, 4] as const;

export const postMembers = {
  [ONE]: {
    contentsCount: 2,
    contents: [
      {
        ...users[0],
        memberId: 1,
        memberRole: 'HOST',
      },
      {
        ...users[1],
        memberId: 2,
        memberRole: 'PARTICIPANT',
      },
    ],
  },
  [TWO]: {
    contentsCount: 4,
    contents: [
      {
        ...users[0],
        memberId: 1,
        memberRole: 'PARTICIPANT',
      },
      {
        ...users[1],
        memberId: 2,
        memberRole: 'HOST',
      },
      {
        ...users[2],
        memberId: 3,
        memberRole: 'PARTICIPANT',
      },
      {
        ...users[3],
        memberId: 4,
        memberRole: 'PARTICIPANT',
      },
    ],
  },
  [THREE]: {
    contentsCount: 5,
    contents: [
      {
        ...users[0],
        memberId: 1,
        memberRole: 'HOST',
      },
      {
        ...users[1],
        memberId: 2,
        memberRole: 'PARTICIPANT',
      },
      {
        ...users[2],
        memberId: 3,
        memberRole: 'PARTICIPANT',
      },
      {
        ...users[3],
        memberId: 4,
        memberRole: 'PARTICIPANT',
      },
      {
        ...users[4],
        memberId: 5,
        memberRole: 'PARTICIPANT',
      },
    ],
  },
  [FOUR]: {
    contentsCount: 3,
    contents: [
      {
        ...users[0],
        memberId: 1,
        memberRole: 'PARTICIPANT',
      },
      {
        ...users[1],
        memberId: 2,
        memberRole: 'PARTICIPANT',
      },
      {
        ...users[2],
        memberId: 3,
        memberRole: 'HOST',
      },
    ],
  },
} as {
  [Key in string]: GetMeetingMembersListResponse;
};

export default {
  contentsCount: 4,
  contents: [
    {
      ...users[0],
      memberId: 1,
      memberRole: 'HOST',
    },
    {
      ...users[1],
      memberId: 2,
      memberRole: 'PARTICIPANT',
    },
    {
      ...users[2],
      memberId: 3,
      memberRole: 'PARTICIPANT',
    },
    {
      ...users[3],
      memberId: 4,
      memberRole: 'PARTICIPANT',
    },
  ],
} as GetMeetingMembersListResponse;
