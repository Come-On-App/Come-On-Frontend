import { DateRange } from '@post/features/post/type';
import type { DateData } from 'react-native-calendars';

type Selected = {
  color: string;
};

export type SelectedDates = {
  [key in string]: Selected;
};

export interface Icalendar {
  current?: string;
  onDayPress: (startingDay: DateData, endingDay: DateData) => void;
  loadPreviousDate?: () => DateRange;
}
