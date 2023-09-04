import { GetMeetingTimeResponse } from '@post/api/v1/type';

const [ONE, TWO, THREE, FOUR] = [1, 2, 3, 4] as const;

export const meetingTimeResponse = {
  [ONE]: {
    meetingStartTime: '08:00:00',
  },
  [TWO]: {
    meetingStartTime: '13:30:00',
  },
  [THREE]: {
    meetingStartTime: '13:00:00',
  },
  [FOUR]: {
    meetingStartTime: '19:30:00',
  },
} as {
  [Key in string]: GetMeetingTimeResponse;
};
