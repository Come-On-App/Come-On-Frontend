import { DateData } from 'react-native-calendars';
import type { Calendar, FixedDate } from '@post/api/v2/type';

export interface IvoteCalendar {
  range: Calendar;
  onDayPress: ({ dateString }: DateData) => void;
  fixedDate: FixedDate;
}
