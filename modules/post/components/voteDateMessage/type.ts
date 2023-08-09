import { DateRange } from '@post/features/post/type';

export interface IvoteGuideRobot {
  type?: 'search' | 'default';
  dateRange: DateRange;
}
