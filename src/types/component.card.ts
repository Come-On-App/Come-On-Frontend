import type { GetMeetingResponse, MemberRole } from '@type/api.meeting';
import type { IconName } from '@type/index';

export interface CardProps {
  cardItem: GetMeetingResponse;
}

export interface DisplayIconProps {
  icon: IconName;
}

export interface GroupDisplayProps {
  people: number;
}

export interface ConfirmDisplayProps {
  isDecided: boolean;
}

export interface CardMenuProps {
  meetingId: number;
  role: MemberRole;
}

export interface CardMenuDisplayProps {
  showMenu: () => void;
}

export interface CardMenuItemsProps {
  role: MemberRole;
  meetingId: number;
  hideMenu: () => void;
}

export interface CardModalButtonProps {
  code: string;
  onClose: () => void;
}

export interface CardModalProps {
  isVisible: boolean;
  onClose: () => void;
  meetingId: number;
}

export type Code = { code: string };

export interface CardModalTopProps {
  isLoading: boolean;
}

export interface CardTtileProps {
  titleText: string;
}

export interface CardSubTitleProps {
  userText: string;
  dateRange: {
    calendarStartFrom: string;
    calendarEndTo: string;
  };
}

export interface TopInfoProps {
  role: MemberRole;
  people: number;
  meetingId: number;
  isDecided: boolean;
}

export interface LeftAreaProps {
  info: TopInfoProps;
}

export interface RightAreaProps {
  meetingId: number;
  role: MemberRole;
}

export interface MenuConfig {
  onPress: () => void;
  text: '초대코드 관리' | '모임 수정' | '모임 탈퇴';
  permission: boolean;
  style?: {
    color: 'red';
  };
}

export interface CardMenuItemProps {
  role: MemberRole;
  menu: MenuConfig[];
}
