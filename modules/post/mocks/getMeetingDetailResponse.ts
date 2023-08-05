export default {
  meetingMetaData: {
    meetingId: 333,
    thumbnailImageUrl: 'https://picsum.photos/200/300',
    meetingName: '예제 모임 1',
    meetingStartTime: '11:00:00',
    hostUser: {
      userId: 112,
      nickname: 'user112',
      profileImageUrl: 'https://picsum.photos/200/300',
    },
    calendar: {
      startFrom: '2023-03-01',
      endTo: '2023-03-31',
    },
    fixedDate: {
      startFrom: '2023-03-11',
      endTo: '2023-03-11',
    },
  },
  members: [
    {
      memberId: 88,
      userId: 112,
      nickname: 'user112',
      profileImageUrl: 'https://picsum.photos/200/300',
      memberRole: 'HOST',
    },
    {
      memberId: 109,
      userId: 134,
      nickname: 'user134',
      profileImageUrl: 'https://picsum.photos/200/300',
      memberRole: 'PARTICIPANT',
    },
  ],
  votingDates: [
    {
      date: '2023-03-05',
      memberCount: 2,
      myVoting: true,
    },
    {
      date: '2023-03-07',
      memberCount: 1,
      myVoting: false,
    },
    {
      date: '2023-03-11',
      memberCount: 1,
      myVoting: true,
    },
  ],
  places: [
    {
      meetingPlaceId: 3323,
      placeName: '홍대역',
      memo: '여기서 모이자',
      lat: 68.123,
      lng: 127.31561,
      address: 'XXX-YYYY',
      order: 1,
      category: 'ETC',
      googlePlaceId: 'asd23234tabn4tav',
    },
    {
      meetingPlaceId: 3642,
      placeName: '홍대 마약 떡볶이',
      memo: '점심식사',
      lat: 68.4567,
      lng: 127.1252346,
      address: 'ZZZ-1231',
      order: 2,
      category: 'RESTAURANT',
      googlePlaceId: '36m3w546hwh3w4gv',
    },
  ],
};
