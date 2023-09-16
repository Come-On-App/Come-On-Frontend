import { FixedDate, Calendar, Members } from '@post/api/v2/type';

export interface Ischedule {
  isHost: boolean;
  range: Calendar;
  fixedDate: FixedDate;
  members: Members[];
}
