import { GetDateVotingListResponse } from '@post/api/v1/type';
import { FixedDate } from '@post/api/v2/type';

export type VotingStatus = GetDateVotingListResponse;

export interface DetailState {
  postId: number;
  votingStatus: VotingStatus;
  fixedDate: FixedDate;
}
