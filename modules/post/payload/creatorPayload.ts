import { DateInfo } from '@shared/components/calendar/type';
import generatePayload from '@shared/utils/generatePayload';

export type MeetingDateRange = {
  startFrom: DateInfo | null;
  endTo: DateInfo | null;
};

interface Icreator {
  meetingImage: string;
  meetingName: string;
  meetingDateRange: MeetingDateRange;
}

export const postCreatorPayload = generatePayload<Icreator>({
  meetingName: '',
  meetingImage: '',
  meetingDateRange: { startFrom: null, endTo: null },
});
