import { Dispatch, SetStateAction } from 'react';

export interface ItimeRange {
  prevRange: string | null;
  title: string;
  description: string;
  onPressDay: (setRange: Dispatch<SetStateAction<string | null>>) => void;
}
