import { AccessToken, RefreshToken } from '@account/api/v1/type';

// POST /api/v1/auth/reissue (payalod)
export interface PostReissueTokenPayload {
  refreshToken: string;
}

// POST /api/v1/auth/reissue (response)
export interface PostReissueTokenResponse {
  accessToken: AccessToken;
  refreshToken: RefreshToken;
}
