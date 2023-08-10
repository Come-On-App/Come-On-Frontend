import { DateRange } from '@post/features/post/type';
import { StyleProp, ViewStyle } from 'react-native';
import type { DateData } from 'react-native-calendars';

export type DateInfo = DateData | null;

type Selected = {
  color: string;
};

export type SelectedDates = {
  [key in string]: Selected;
};

export interface Icalendar {
  current?: string;
  onDayPress: (startingDay: DateInfo, endingDay: DateInfo) => void;
  loadPreviousDate?: () => DateRange;
  containerStyle?: StyleProp<ViewStyle>;
  calendarStyle?: StyleProp<ViewStyle>;
}