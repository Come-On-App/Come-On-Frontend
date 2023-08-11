import { AuthState } from '@account/features/auth/type';

export const mockUserAuthToken = {
  accessToken: {
    token:
      'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJBVEsiLCJpc3MiOiJjb21lb24tYmFja2VuZCIsImlhdCI6MTY4MTE3ODkxMCwiZXhwIjoxNjgxMTc4OTIwLCJ1aWQiOjEyMywibmlrIjoidXNlcl8xMjMiLCJhdXQiOiJST0xFX1VTRVIifQ.9aoaHywtps2ZQ5ux8TkWtcQ7VF9BgPscCDebnm8BC_U',
    expiry: 1681178920000,
    userId: 123,
  },
  refreshToken: {
    token:
      'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJSVEsiLCJpc3MiOiJjb21lb24tYmFja2VuZCIsImlhdCI6MTY4MTE3ODkxMCwiZXhwIjoxNjgxMTc4OTQwLCJ1aWQiOjEyM30.qTwWGlhwPjWCjsWz9faqfQ3-G1803b8IOZfVP2P81Yw',
    expiry: 1681178940000,
  },
};

export const mockUserAuthState = {
  userToken: mockUserAuthToken,
  isLoading: {
    apple: false,
    google: false,
  },
  isReissue: false,
  isError: false,
} as AuthState;
