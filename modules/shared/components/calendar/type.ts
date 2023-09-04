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

export type SingleDatePressHandler = (currentDate: DateData) => void;

export type RangeDatePressHandler = (
  startingDay: DateInfo,
  endingDay: DateInfo,
) => void;

export interface Icalendar {
  current?: string;
  onDayPress: SingleDatePressHandler | RangeDatePressHandler;
  loadPreviousDate?: () => DateRange;
  _containerStyle?: StyleProp<ViewStyle>;
  _calendarStyle?: StyleProp<ViewStyle>;
  blockLocalEvent?: boolean;
  focusDate?: string;
  focusDotColor?: string;
}

export interface CalendarState {
  startingDay: DateInfo;
  endingDay: DateInfo;
}

export type CalendarAction =
  | {
      type: 'UPDATE_DAYS';
      payload: { startingDay: DateInfo; endingDay: DateInfo };
    }
  | { type: 'UPDATE_STARTING_DAY'; payload: { startingDay: DateInfo } }
  | { type: 'UPDATE_ENDING_DAY'; payload: { endingDay: DateInfo } };

export interface FocusDate {
  focusDate: string | undefined;
  focusDotColor: string;
}
