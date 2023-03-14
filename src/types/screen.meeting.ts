import type { GetMeetingPlacesListResponse } from '@type/api.meeting';
import type { MeetingDetailNavigation } from './navigation';

export type Places = GetMeetingPlacesListResponse | undefined;

export interface MarkerListProps {
  places: Places;
}

export interface PlaceProps {
  meetingId: number;
  navigation: MeetingDetailNavigation;
}

export interface PlaceTopProps {
  color: string;
}

export interface PlaceMainProps {
  color: string;
  meetingId: number;
  navigation: MeetingDetailNavigation;
}
