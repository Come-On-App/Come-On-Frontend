import '@rneui/themed';
import type { MaterialIcons } from '@expo/vector-icons';
import type { TextStyle, ViewStyle, StyleProp } from 'react-native';

import type {
  GooglePlaceData,
  GooglePlaceDetail,
} from 'react-native-google-places-autocomplete';
import type { MapLocation } from '@type/api.map';
import type { CategoryKey } from '@type/api.meeting';
import { Dispatch, SetStateAction } from 'react';

export type SetState<T> = Dispatch<SetStateAction<T>>;

/**
 * Global Theme
 */
type Typography =
  | 'title1'
  | 'title2'
  | 'title3'
  | 'title4'
  | 'body1'
  | 'body2'
  | 'body3'
  | 'caption';

type Grayscale =
  | '0'
  | '50'
  | '100'
  | '200'
  | '300'
  | '400'
  | '500'
  | '600'
  | '700'
  | '800'
  | '900';

declare module '@rneui/themed' {
  export interface Colors {
    info: string;
  }

  export interface Theme {
    grayscale: {
      [Key in Grayscale]: string;
    };
    textStyles: {
      [Key in Typography]: {
        fontSize: number;
        lineHeight: number;
      };
    };
    calendarStyles: {
      period: string;
    };
  }
}

// Code
export interface CodeInputProps {
  codeText: string;
  setCodeText: SetState<string>;
  style?: StyleProp<TextStyle>;
  showKeyboard: boolean;
}

export interface CodeButtonProps {
  codeText: string;
  isLoading: boolean;
  onPress: () => void;
}

// Input
export interface InputBoxProps {
  config: InputTextProps;
  style?: StyleProp<TextStyle>;
}

export interface InputTopProps {
  label: string;
  text: string;
  maxLength: number;
}

export interface InputBoxTopTextLengthProps {
  text: string;
  maxLength: number;
  style?: StyleProp<TextStyle>;
}

export interface InputBoxTopTitleProps {
  label: string;
  bold?: boolean;
  style?: StyleProp<TextStyle>;
}

export interface InputProps {
  value: string;
  maxLength: number;
  multiline: boolean;
  placeholder: string;
  onChangeText: (text: string) => void;
  style?: StyleProp<TextStyle>;
}

export interface InputFormProps {
  inputProps: InputTextProps;
}

export interface InputTextProps extends InputProps {
  label: string;
}

// errorType
export type ErrorType = {
  errorCode: number;
  errorDescription: string;
  errors: object;
};

// LoginResponse
export type userInfo = {
  email: string;
  name: string;
  nickname: string;
  profileImageUrl?: string | null;
  role: string;
  userId: number;
};

export type returnToken = {
  token: string;
  expiry: number;
  userId: number;
};

export type SocialLoginProps = {
  url: string;
  data: object;
};

export interface AuthResponse {
  accessToken: {
    token: string;
    expiry: number;
    userId: number;
  };
  refreshToken: {
    token: string;
    expiry: number;
    userId: number;
  };
}

export interface AccessTokenRes {
  accessToken: Token;
}

export interface RefreshTokenRes {
  refreshToken: Token;
}

export interface Token {
  token: string;
  expiry: number;
  userId: number;
}

export type MeetingResponse = {
  id: number;
  myMeetingUserId: number;
  myMeetingRole: 'HOST' | 'EDITOR' | 'PARTICIPANT';
  title: string;
  startDate: string;
  endDate: string;
  meetingUsers: MeetingUser[];
  meetingDates: MeetingDate[];
  meetingPlaces: MeetingPlace[];
};

export type MeetingUser = {
  id: number;
  nickname: string;
  imageLink: string;
  meetingRole: 'HOST' | 'EDITOR' | 'PARTICIPANT';
};

export type MeetingDate = {
  id: number;
  date: string;
  userCount: number;
  dateStatus: 'FIXED' | 'UNFIXED';
  isSelected: boolean;
};

export type MeetingPlace = {
  id: number;
  name: string;
  description: string;
  lat: number;
  lng: number;
  address: string;
  order: number;
  apiId: number;
  category: string;
};

export type PlaceProps = {
  data: MeetingPlace[];
};

export type PlaceCardBodyProps = {
  data: MeetingPlace;
};

/// memberBox
export type MemberBoxProps = {
  myId: number;
  myRole: 'HOST' | 'EDITOR' | 'PARTICIPANT';
  meetingUsers: MeetingUser[];
};

export interface MemberBoxTitleProps {
  userCount: number;
}

export interface MemberBoxSubTitleProps {
  onClickManage: () => void;
}

export interface UserRowProps {
  user: MeetingUser[];
  renderAvatar: (users: MeetingUser[]) => JSX.Element[];
}

// calendar
export type SubDateProps = {
  date: date;
};

export type date = {
  startDate: string;
  endDate: string;
};

export type CalendarProps = {
  type: 'PERIOD' | 'DEFAULT';
  data: MeetingResponse | undefined; // TODO: 추후 undefined 수정
  setDate?: React.Dispatch<
    React.SetStateAction<{
      startDate: string;
      endDate: string;
    }>
  >;
};

export interface CalendarTypeProps {
  data: MeetingResponse | undefined; // TODO: 추후 undefined 수정
  setDate?: React.Dispatch<
    React.SetStateAction<{
      startDate: string;
      endDate: string;
    }>
  >;
}

export interface OverayCalendarProps {
  visible: boolean;
  onPressLabel: () => void;
}

export interface MeetingTitleProps {
  onPressLabel: () => void;
}

// api
export type MeetingInfo = {
  meetingName: string;
  meetingImageUrl: string;
  calendarStartFrom: string;
  calendarEndTo: string;
};

// Icon
export type IconName = React.ComponentProps<typeof MaterialIcons>['name'];

export interface IconProps {
  name: IconName;
  color?: string;
  size: number;
  onPress?: () => void;
}

export interface CalendarBoxProps {
  data: MeetingResponse;
}

export interface Icon {
  iconName: IconName;
  size: number;
  color: string;
}

// SearchBar
export interface SearchBarProps {
  style?: StyleProp<TextStyle>;
  IconType: IconName;
  value: string;
  onChange?: (text: string) => void;
}

// Avatar
export interface AvatarProps {
  path?: string | null;
  size: number;
  containerStyle?: StyleProp<ViewStyle>;
}

export interface BadgedAvatarProps extends AvatarProps {
  badge: {
    icon: Icon;
    backgroundColor: string;
  };
  onPress: () => void;
}

// TabBar
export interface TabBarIconProps {
  color: string;
}

// StyledText
export interface TextProps {
  style?: StyleProp<TextStyle>;
  children: React.ReactNode;
}

// PlaceSelect

// modal
export interface ModalProps {
  isVisible: boolean;
  style?: StyleProp<ViewStyle>;
  children: React.ReactNode;
}

declare module '@rneui/themed' {
  export interface Theme {
    DayTheme: {
      colors: {
        dayFilteredColor: string;
        dayStartColor: string;
        dayEndColor: string;
      };
      startDayStyle: {
        container: object;
        textColor: object;
      };
      endDayStyle: {
        container: object;
        textColor: object;
      };
      dayStyle: {
        container: object;
        oneDaySelectedStyle: object;
      };
    };
  }
}

// location
export interface MapRegion extends MapLocation {
  latitudeDelta: number;
  longitudeDelta: number;
}

export interface LocationObject {
  coords: {
    accuracy: number | null;
    altitude: number | null;
    altitudeAccuracy: number | null;
    heading: number | null;
    latitude: number;
    longitude: number;
    speed: number | null;
  };
}

export type PlaceSelectState = 'Add' | 'Modify';

export type Lock = {
  meetingResourceType: 'MEETING_PLACE_LOCK' | 'MEETING_PLACE_UNLOCK';
  meetingId: number;
  meetingPlaceId: number;
  userId: number;
};

// Redux state
export interface PlaceSelect {
  address: string;
  currentLocation: MapLocation | null;
  marker: MapLocation | null;
  mapRegion: MapRegion | null;
  placeName: string;
  googlePlaceId: string;
  category: CategoryKey | null;
  description: string;
  meetingId: number;
  meetingPlaceId: number;
  meetingPlaceCardMarker: MapRegion | null;
  state: PlaceSelectState;
  isChanged: boolean;
  isLock: boolean;
}

export type GooglePlacesOnPressHandler = (
  _data: GooglePlaceData,
  detail: GooglePlaceDetail | null,
) => void;
