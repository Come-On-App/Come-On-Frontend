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
  onDayPress?: (arg0: DateInfo, arg1: DateInfo) => void;
}
