import { PostDateVotingPayload } from '@post/api/v1/type';
import { FixedDate, GetMeetingMemberMeResponse } from '@post/api/v2/type';

export interface IVoteButton {
  isHost: boolean;
  isFixed: boolean;
  isShow: boolean;
  myVoting: boolean;
  currentDate: string;
  fixedDate: FixedDate;
}

export interface IToggleVoteButton {
  isFixed: boolean;
  disabled: boolean;
  myVoting: boolean;
  fixedDate: FixedDate;
  currentDate: string;
}

export interface IConfirmMeetingDateButton {
  isHost: boolean;
  isFixed: boolean;
  disabled: boolean;
  currentDate: string;
}

export interface HandleVoteMutationProps {
  currentDate: string;
  isAdding: boolean;
  myMeetingStatus: GetMeetingMemberMeResponse | undefined;
  payload: PostDateVotingPayload;
}
