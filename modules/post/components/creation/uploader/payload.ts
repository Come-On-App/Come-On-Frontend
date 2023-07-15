/* eslint-disable import/prefer-default-export */
import generatePayload from '@shared/utils/generatePayload';

interface Icreator {
  meetingImage: string;
  meetingName: string;
  meetingDateRange: string;
}

export const postCreatorPayload = generatePayload<Icreator>({
  meetingName: '',
  meetingImage: '',
  meetingDateRange: '',
});
