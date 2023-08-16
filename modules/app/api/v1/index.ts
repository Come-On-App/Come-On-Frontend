/* eslint-disable import/prefer-default-export */
import axios from 'axios';

import { UserToken } from '@account/features/auth/type';
import { BASE_URL } from '@app/api/config';
import { PostReissueTokenPayload, PostReissueTokenResponse } from './type';

/**
 * POST /api/v1/auth/reissue 액세스 토큰 재발급
 * @param payload 백엔드에서 발급한 유효한 리프레시 토큰.
 * @returns 유효한 유저의 토큰
 */
export function requestPostReissueToken(userToken: UserToken | null) {
  async function requestUserToken(
    payload: PostReissueTokenPayload,
  ): Promise<PostReissueTokenResponse> {
    const URL = `${BASE_URL}/api/v1/auth/reissue`;
    const { data } = await axios.post(URL, {
      ...payload,
      reissueRefreshTokenAlways: true,
    });

    return data;
  }

  if (!userToken) throw new Error('userToken is empty');

  return requestUserToken({
    refreshToken: userToken.refreshToken.token,
  });
}
