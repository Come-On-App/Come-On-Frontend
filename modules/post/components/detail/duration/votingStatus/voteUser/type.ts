import { GetDateVotingDetailsResponse } from '@post/api/v1/type';

export interface IVoteUser {
  userName: string;
  userAvatarPath: string;
}

export interface IVoteUserList {
  voteStatus: GetDateVotingDetailsResponse | undefined;
  isLoading: boolean;
}
