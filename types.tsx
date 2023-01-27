import '@rneui/themed';
import { MaterialIcons } from '@expo/vector-icons';
import { TextStyle, ViewStyle, StyleProp } from 'react-native';
import { DateData } from 'react-native-calendars';
import { MarkedDates } from 'react-native-calendars/src/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList, RootStackScreenProps } from './navigation';

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
  setCodeText: React.Dispatch<React.SetStateAction<string>>;
  style?: StyleProp<TextStyle>;
  showKeyboard: boolean;
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
}

export interface InputBoxTopTitleProps {
  label: string;
}

export interface InputProps {
  value: string;
  maxLength: number;
  multiline: boolean;
  placeholder: string;
  onChangeText: (text: string) => void;
}

export interface InputFormProps {
  inputProps: InputTextProps;
}

export interface InputTextProps extends InputProps {
  label: string;
}

// LoginResponse

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

/*
 *PlaceCardProps
 TODO : 추후 문서보고 수정
 */

export type AddPlaceButtonProps = {
  navigation: NativeStackNavigationProp<
    RootStackParamList,
    'MeetingRoom',
    undefined
  >;
  iconName: IconName;
  text: string;
};

export interface IconButtonProps {
  style?: StyleProp<ViewStyle>;
  onPress: () => void;
  icon: Icon;
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
export type CalendarProps = {
  type: 'PERIOD' | 'DEFAULT';
  data: MeetingResponse | undefined; // TODO: 추후 undefined 수정
};

export interface CalendarTypeProps {
  data: MeetingResponse | undefined; // TODO: 추후 undefined 수정
}

export interface OverayCalendarProps {
  visible: boolean;
  onPressLabel: () => void;
}

export interface MeetingTitleProps {
  onPressLabel: () => void;
}

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

// Card
export type CardItem = {
  path: string;
  people: {
    member: number;
    isDecided: boolean;
  };
  title: string;
  subTitle: {
    user: string;
    date: string;
  };
};

export interface CardModalProps {
  isVisible: boolean;
  onClose: () => void;
}

export interface CardModalButtonProps {
  onClose: () => void;
}

export interface CardListProps {
  cardItems: CardItem[];
}

export interface CardProps {
  cardItem: CardItem;
}

export interface DisplayIconProps {
  icon: IconName;
}

export interface GroupDisplayProps {
  people: number;
}

export interface ConfirmDisplayProps {
  isDecided: boolean;
}

export interface CardTtileProps {
  titleText: string;
}

export interface CardSubTitleProps {
  userText: string;
  dateText: string;
}

export interface InfoProps {
  people: number;
  isDecided: boolean;
}

export interface LeftAreaProps {
  style: ViewStyle;
  infoProps: InfoProps;
}

export interface CardMenuProps {
  style: ViewStyle;
}

export interface CardMenuDisplayProps {
  showMenu: () => void;
  style: ViewStyle;
}

export interface RightAreaProps {
  style: ViewStyle;
}

// Avatar
export interface AvatarProps {
  path: string;
  size: number;
  containerStyle?: StyleProp<ViewStyle>;
}

export interface BadgedAvatarProps extends AvatarProps {
  badge: {
    icon: Icon;
    backgroundColor: string;
  };
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

// Buttons
type ButtonStyle = {
  backgroundColor: string;
  width: number | string;
  height: number | string;
  borderRadius?: number;
  marginRight?: number | string;
};

type ButtonTextStyle = {
  fontSize: number;
  color: string;
};

export interface ButtonProps {
  text: string;
  bold?: boolean;
  onPress: () => void;
  height?: number;
  textStyle?: Partial<ButtonTextStyle>;
  buttonStyle?: Partial<ButtonStyle> | Partial<ButtonStyle>[];
}

type ButtonGroupStyle = {
  width: number;
  backgroundColor: string;
};

type ButtonConfig = {
  text: string;
  onPress: () => void;
  style?: Partial<ButtonGroupStyle>;
};

export interface ButtonGroupProps {
  height?: number;
  spacing?: number;
  firstButton: ButtonConfig;
  secondButton: ButtonConfig;
}

// PlaceSelect
export interface AddressProps {
  info: {
    title: string;
    category: string;
  };
}

export interface AddressTitleProps {
  text: string;
}

export interface CategoryProps {
  text: string;
}

export interface SubAddressProps {
  info: {
    title: string;
  };
}

export interface PlaceSelectButtonProps {
  onPress: () => void;
}

export interface PlaceSelectModalProps {
  isVisible: boolean;
  onClose: () => void;
}

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
