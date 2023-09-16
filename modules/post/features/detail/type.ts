export type PostStatus = 'EDIT' | 'CREATE';

export interface DetailState {
  postId: number;
  cardId: number;
  status: PostStatus;
}
