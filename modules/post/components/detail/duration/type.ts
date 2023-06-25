import { IFormatDateRange } from '@shared/utils/type';

export interface Iduration {
  range: {
    range: IFormatDateRange;
    isFixed: boolean;
  };
  time: {
    time: string;
    isHost: boolean;
  };
}
