export interface IDisplayDateAndCount {
  enabled: boolean;
  dateString: string;
  voteCount: number;
  totalMember: number;
  myVoting: boolean;
}

export interface IDisplayTotalMember {
  member: number;
}

export interface IVotingStatusSlider {
  isEnabled: boolean;
  dateString: string;
  voteCount: number;
  totalMember: number;
  myVoting: boolean;
}

export interface ICurrentVotingStatus {
  voteCount: number;
  dateString: string;
  totalMember: number;
  myVoting: boolean;
}
