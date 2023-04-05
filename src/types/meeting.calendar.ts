import { MeetingDate, MeetingPlace } from '.';
// eslint-disable-next-line import/extensions
import { GetDateVotingResponse, Members } from './api.meeting';

export type MeetingResponse = {
  id: number;
  myMeetingUserId: number;
  myMeetingRole: 'HOST' | 'EDITOR' | 'PARTICIPANT';
  title: string;
  startDate: string;
  endDate: string;
  meetingUsers: Members[];
  meetingDates: MeetingDate[];
  meetingPlaces: MeetingPlace[];
};

// calendar
export type SubDateProps = {
  date: date;
};

export type date = {
  startDate: string;
  endDate: string;
};

export type CalendarProps = {
  type: 'PERIOD' | 'DEFAULT';
  data?: GetDateVotingResponse;
  totalUsers?: number;
  startFrom?: string;
  endTo?: string;
  meetingId?: number;
  hostId?: number;
  setDate?: React.Dispatch<
    React.SetStateAction<{
      startDate: string;
      endDate: string;
    }>
  >;
  options?: CalendarOptions;
};

export type CalendarOptions = {
  minDate: boolean;
  noListCalendar: boolean;
};

export type CalenderClickEventType = {
  dateString: string;
  day: number;
  month: number;
  timestamp: number;
  year: number;
};

export interface CalendarVotingTypeProps {
  data: GetDateVotingResponse;
  startFrom: string;
  endTo: string;
  totalUsers: number;
  hostId?: number;
  meetingId: number;
  setDate?: React.Dispatch<
    React.SetStateAction<{
      startDate: string;
      endDate: string;
    }>
  >;
}

export interface CalendarPeriodScrollProps {
  data?: GetDateVotingResponse;
  setDate?: React.Dispatch<
    React.SetStateAction<{
      startDate: string;
      endDate: string;
    }>
  >;
}

export interface CalendarPeriodTypeProps {
  data?: GetDateVotingResponse;
  options?: CalendarOptions;
  setDate?: React.Dispatch<
    React.SetStateAction<{
      startDate: string;
      endDate: string;
    }>
  >;
}

export interface OverayCalendarProps {
  visible: boolean;
  onPressLabel: () => void;
}

export interface MeetingTitleProps {
  onPressLabel: () => void;
}

export interface CalendarBoxProps {
  data: MeetingResponse;
}

declare module '@rneui/themed' {
  export interface Theme {
    DayTheme: {
      colors: {
        dayFilteredColor: string;
        dayStartColor: string;
        dayEndColor: string;
      };
      startDayStyle: {
        container: object;
        textColor: object;
      };
      endDayStyle: {
        container: object;
        textColor: object;
      };
      dayStyle: {
        container: object;
        oneDaySelectedStyle: object;
      };
    };
  }
}
