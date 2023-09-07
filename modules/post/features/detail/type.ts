import { GetDateVotingListResponse } from '@post/api/v1/type';
import { FixedDate } from '@post/api/v2/type';
import { CategoryType } from '@post/components/detail/planner/venue/card/category/type';

export type VotingStatus = GetDateVotingListResponse;

export interface DetailState {
  postId: number;
  votingStatus: VotingStatus;
  fixedDate: FixedDate;
}

export interface PlannerState {
  title: string;
  content: string;
  subContent: string;
  category: CategoryType;
}
