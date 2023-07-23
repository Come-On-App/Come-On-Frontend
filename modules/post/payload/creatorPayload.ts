import { DateInfo } from '@shared/components/calendar/type';
import generatePayload from '@shared/utils/generatePayload';
import type { ImagePickerAsset } from 'expo-image-picker';

export type MeetingDateRange = {
  startFrom: DateInfo | null;
  endTo: DateInfo | null;
};

interface Icreator {
  meetingImage: ImagePickerAsset | null;
  meetingName: string;
  meetingDateRange: MeetingDateRange;
}

export const postCreatorPayload = generatePayload<Icreator>({
  meetingName: '',
  meetingImage: null,
  meetingDateRange: { startFrom: null, endTo: null },
});
