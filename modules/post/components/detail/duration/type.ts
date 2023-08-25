import { IFormatDateRange } from '@shared/utils/type';

export interface Iduration {
  id: number;
}

export interface Iduration2 {
  range: {
    range: IFormatDateRange;
    isFixed: boolean;
  };
  time: {
    time: string;
    isHost: boolean;
  };
}
