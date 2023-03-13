import { Members } from '@type/api.meeting';

export interface OnLineAvatarProps {
  item: Members;
  onPressHandler: () => void;
}

export type OnLineUserList = number[];

export type BanUserList = number[];

export type LittleMemberBoxProps = {
  item: Members;
  banUserList: BanUserList;
  children: React.ReactNode;
};

export type BanMemberAvatarProps = {
  item: Members;
  banUserList: BanUserList;
  onlineUserList: OnLineUserList;
  hostId?: number;
  onPressAvatar: (item: Members) => void;
};
