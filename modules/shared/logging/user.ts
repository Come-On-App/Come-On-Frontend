/* eslint-disable import/prefer-default-export */

import analytics from '@react-native-firebase/analytics';

/**
 * [Firebase Log] - 회원 탈퇴
 */
export const logUserDelete = async () => {
  await analytics().logEvent('user: delete user');
};
