export interface IVoteDetailModal {
  dateString: string;
  totalMember: number;
  voteCount: number;
  isShowModal: boolean;
  onBackdropPress: () => void;
}
