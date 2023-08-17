import { AxiosResponse, isAxiosError } from 'axios';

import { UserToken } from '@account/features/auth/type';
import { isExpiry } from '@shared/utils';
import { ErrorResponse, MaybeErrorCode } from './type';

function getErrorCodeFromAxiosError(error: unknown) {
  if (isAxiosError(error) && error.response) {
    const { errorCode } = (error.response as AxiosResponse<ErrorResponse>).data;

    return errorCode;
  }

  return undefined;
}

function isExpiredAccessTokenCode(errorCode: MaybeErrorCode) {
  const EXPIRED_ACCESS_TOKEN_CODE = 4001;
  const INVALID_ACCESS_TOKEN_CODE = 1103;

  return (
    errorCode === EXPIRED_ACCESS_TOKEN_CODE ||
    errorCode === INVALID_ACCESS_TOKEN_CODE
  );
}

export function isExpiredRefreshTokenCode(errorCode: MaybeErrorCode) {
  const EXPIRED_REFRESH_TOKEN_CODE = 4002;

  return errorCode === EXPIRED_REFRESH_TOKEN_CODE;
}

export function checkIfAccessTokenExpired(error: unknown) {
  const EXPIRED = true;
  const NOT_EXPIRED = false;

  if (isExpiredAccessTokenCode(getErrorCodeFromAxiosError(error))) {
    return EXPIRED;
  }

  return NOT_EXPIRED;
}

export function verifyRefreshToken(userToken: UserToken) {
  if (isExpiry(userToken.refreshToken.expiry)) {
    throw new Error('Refresh token expired');
  }

  return userToken;
}
