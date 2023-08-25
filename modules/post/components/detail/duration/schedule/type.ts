import { FixedDate } from '@post/api/v2/type';
import { IFormatDateRange } from '@shared/utils/type';

export interface Ischedule {
  range: IFormatDateRange;
  fixedDate: FixedDate | null;
}
