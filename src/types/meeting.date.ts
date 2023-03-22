import { MeetingDetailNavigation } from './navigation';

export type Calendar = {
  startFrom: string;
  endTo: string;
};

export interface DateProps {
  calendar: Calendar;
  meetingId: number;
  navigation: MeetingDetailNavigation;
}

export interface DateMainProps {
  meetingId: number;
  calendar: Calendar;
}

export interface DateMainLeftProps {
  calendar: Calendar;
}

export interface DateMainRightProps {
  meetingId: number;
}

export interface DateBottomProps {
  meetingId: number;
  navigation: MeetingDetailNavigation;
}

export interface TimePickerProps {
  onSubmit: (meetingStartTime: string) => void;
  time: Date;
}
