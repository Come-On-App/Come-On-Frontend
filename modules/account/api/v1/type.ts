export type AccessToken = {
  token: string;
  expiry: number;
  userId: number;
};

export type RefreshToken = {
  token: string;
  expiry: number;
};

// POST /api/v1/oauth/google (payalod)
export interface PostGoogleAuthPayload {
  idToken: string;
}

// POST /api/v1/oauth/google (response)
export interface PostGoogleAuthResponse {
  accessToken: AccessToken;
  refreshToken: RefreshToken;
}

// POST /api/v1/oauth/apple (payalod)
export interface PostAppleAuthPayload {
  identityToken: string;
  user: string;
  email?: string | null;
  name?: string | null;
}

// POST /api/v1/oauth/apple (response)
export interface PostAppleAuthResponse {
  accessToken: AccessToken;
  refreshToken: RefreshToken;
}

// POST /api/v1/oauth/apple (response)
export interface PostUserLogoutResponse {
  success: boolean;
}
