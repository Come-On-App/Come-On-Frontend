type Role = 'ADMIN' | 'USER';

// GET /api/v2/users/me (response)
export interface GetMyInfoResponse {
  userId: number;
  nickname: string;
  profileImageType: 'CUSTOM' | 'DEFAULT';
  profileImageUrl: string;
  role: Role;
  email: string | null;
  name: string;
}
