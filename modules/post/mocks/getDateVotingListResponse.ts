import { GetDateVotingListResponse } from '@post/api/v1/type';

const [ONE, TWO, THREE, FOUR] = [1, 2, 3, 4] as const;

export const dateVotingResponse = {
  [ONE]: {
    contentsCount: 8,
    contents: [
      {
        date: '2023-07-08',
        memberCount: 0,
        myVoting: false,
      },
      {
        date: '2023-07-09',
        memberCount: 1,
        myVoting: false,
      },
      {
        date: '2023-07-10',
        memberCount: 2,
        myVoting: true,
      },
      {
        date: '2023-07-11',
        memberCount: 0,
        myVoting: false,
      },
      {
        date: '2023-07-12',
        memberCount: 0,
        myVoting: false,
      },
      {
        date: '2023-07-13',
        memberCount: 0,
        myVoting: false,
      },
      {
        date: '2023-07-14',
        memberCount: 0,
        myVoting: false,
      },
      {
        date: '2023-07-15',
        memberCount: 0,
        myVoting: false,
      },
    ],
  },
  [TWO]: {
    contentsCount: 2,
    contents: [
      {
        date: '2023-06-02',
        memberCount: 0,
        myVoting: false,
      },
      {
        date: '2023-06-03',
        memberCount: 1,
        myVoting: false,
      },
    ],
  },
  [THREE]: {
    contentsCount: 1,
    contents: [
      {
        date: '2023-04-10',
        memberCount: 0,
        myVoting: false,
      },
    ],
  },
  [FOUR]: {
    contentsCount: 4,
    contents: [
      {
        date: '2023-03-05',
        memberCount: 1,
        myVoting: true,
      },
      {
        date: '2023-03-06',
        memberCount: 0,
        myVoting: false,
      },
      {
        date: '2023-03-07',
        memberCount: 0,
        myVoting: false,
      },
      {
        date: '2023-03-08',
        memberCount: 0,
        myVoting: false,
      },
    ],
  },
} as {
  [Key in string]: GetDateVotingListResponse;
};
