import { GetDateVotingDetailsResponse } from '@post/api/v1/type';
import { dateVotingResponse } from './getDateVotingListResponse';
import { mockMyInfo } from '@account/mocks/mockUser';
import image from './image';

const [ONE, TWO, THREE, FOUR] = [1, 2, 3, 4] as const;

export const getDateVotingDetailsResponse = {
  [ONE]: {
    ['2023-07-08']: {
      date: '2023-07-08',
      myVoting: false,
      memberCount: 0,
      votingUsers: [],
    },
    ['2023-07-09']: {
      date: '2023-07-09',
      myVoting: false,
      memberCount: 1,
      votingUsers: [
        {
          userId: 2,
          nickname: '사용자2',
          profileImageUrl: image(),
          memberRole: 'PARTICIPANT',
        },
      ],
    },
    ['2023-07-10']: {
      date: '2023-07-10',
      myVoting: true,
      memberCount: 2,
      votingUsers: [
        {
          userId: mockMyInfo.userId,
          nickname: mockMyInfo.nickname,
          profileImageUrl: mockMyInfo.profileImageUrl,
          memberRole: 'HOST',
        },
        {
          userId: 2,
          nickname: '사용자2',
          profileImageUrl: image(),
          memberRole: 'PARTICIPANT',
        },
      ],
    },
    ['2023-07-11']: {
      date: '2023-07-11',
      myVoting: false,
      memberCount: 0,
      votingUsers: [],
    },
    ['2023-07-12']: {
      date: '2023-07-12',
      myVoting: false,
      memberCount: 0,
      votingUsers: [],
    },
    ['2023-07-13']: {
      date: '2023-07-13',
      myVoting: false,
      memberCount: 0,
      votingUsers: [],
    },
    ['2023-07-14']: {
      date: '2023-07-14',
      myVoting: false,
      memberCount: 0,
      votingUsers: [],
    },
    ['2023-07-15']: {
      date: '2023-07-15',
      myVoting: false,
      memberCount: 0,
      votingUsers: [],
    },
  },
  [TWO]: {
    ['2023-06-02']: {
      date: '2023-06-02',
      myVoting: false,
      memberCount: 0,
      votingUsers: [],
    },
    ['2023-06-03']: {
      date: '2023-06-03',
      myVoting: false,
      memberCount: 1,
      votingUsers: [
        {
          userId: 3,
          nickname: '사용자3',
          profileImageUrl: image(),
          memberRole: 'PARTICIPANT',
        },
      ],
    },
  },
  [THREE]: {
    ['2023-04-10']: {
      date: '2023-04-10',
      myVoting: false,
      memberCount: 0,
      votingUsers: [],
    },
  },
  [FOUR]: {
    ['2023-03-05']: {
      date: '2023-03-05',
      myVoting: true,
      memberCount: 1,
      votingUsers: [
        {
          userId: mockMyInfo.userId,
          nickname: mockMyInfo.nickname,
          profileImageUrl: mockMyInfo.profileImageUrl,
          memberRole: 'HOST',
        },
      ],
    },
    ['2023-03-06']: {
      date: '2023-03-06',
      myVoting: false,
      memberCount: 0,
      votingUsers: [],
    },
    ['2023-03-07']: {
      date: '2023-03-07',
      myVoting: false,
      memberCount: 0,
      votingUsers: [],
    },
    ['2023-03-08']: {
      date: '2023-03-07',
      myVoting: false,
      memberCount: 0,
      votingUsers: [],
    },
  },
} as {
  [Key in string]: {
    [Key in string]: GetDateVotingDetailsResponse;
  };
};
