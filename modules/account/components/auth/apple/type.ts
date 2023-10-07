// @see https://docs.expo.dev/versions/latest/sdk/apple-authentication/#error-codes
type AppleLoginErrorCodes =
  | 'ERR_INVALID_OPERATION'
  | 'ERR_INVALID_RESPONSE'
  | 'ERR_INVALID_SCOPE'
  | 'ERR_REQUEST_CANCELED'
  | 'ERR_REQUEST_FAILED'
  | 'ERR_REQUEST_NOT_HANDLED'
  | 'ERR_REQUEST_NOT_INTERACTIVE'
  | 'ERR_REQUEST_UNKNOWN'
  | 'ERR_UNAVAILABLE';

export interface AppleErrorCode {
  code: AppleLoginErrorCodes;
}
