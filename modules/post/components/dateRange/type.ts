import { DateRange } from '@post/features/post/type';

export type PayloadType = 'creator' | 'modifier';

export interface ItimeRange {
  disabled?: boolean;
  title: string;
  description: string;
  dateRange: DateRange;
}
