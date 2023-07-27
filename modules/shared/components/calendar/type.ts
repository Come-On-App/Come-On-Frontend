import { MeetingDateRange } from '@post/payload/postPayload';
import type { DateData } from 'react-native-calendars';

type Selected = {
  color: string;
};

export type SelectedDates = {
  [key in string]: Selected;
};

export type DateInfo = DateData | null;

export interface Icalendar {
  current?: string;
  onDayPress?: (startingDay: DateInfo, endingDay: DateInfo) => void;
  onLoad?: () => MeetingDateRange;
}
