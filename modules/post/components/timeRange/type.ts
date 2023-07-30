import { MeetingDateRange } from '@post/payload/postPayload';
import { Dispatch, SetStateAction } from 'react';

export type PayloadType = 'creator' | 'modifier';

export interface ItimeRange {
  disabled?: boolean;
  title: string;
  description: string;
  onPressDay: (setRange: Dispatch<SetStateAction<string | null>>) => void;
  payloadType: PayloadType;
  prevRange?: MeetingDateRange;
}
