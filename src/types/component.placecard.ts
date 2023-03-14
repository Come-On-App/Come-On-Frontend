import { Places } from '@type/api.meeting';
import type { MeetingDetailNavigation } from '@type/navigation';

type Props = {
  meetingId: number;
  navigation: MeetingDetailNavigation;
};

export type PlaceCardProps = Props;

export type PlaceAddButtonProps = Props;

export enum common {
  Height = 80,
}

export type CardItem = Places & { meetingId: number };

export interface PlaceCardItemProps {
  content: CardItem;
}

export interface PlaceCardContentProps {
  data: CardItem;
}

export interface PlaceCardMainProps extends PlaceCardContentProps {
  onPress: () => void;
}

export interface PlaceCardRightIconProps {
  onPress: () => void;
}

export interface PlaceCardListProps {
  meetingId: number;
}

export interface PlaceCardOrderProps {
  order: number;
}

export interface SwipeableDelateButtonProps {
  meetingId: number;
  placeId: number;
}
