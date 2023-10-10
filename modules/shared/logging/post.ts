import analytics from '@react-native-firebase/analytics';

/**
 * [Firebase Log] - 모임 생성
 */
export const logPostCreate = async (meetingId: number) => {
  await analytics().logEvent('post: create Meeting', {
    postId: meetingId,
  });
};

/**
 * [Firebase Log] - 모임 입장
 */
export const logPostJoin = async (meetingId: number) => {
  await analytics().logEvent('post: join Meeting', {
    postId: meetingId,
  });
};
