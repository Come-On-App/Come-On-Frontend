/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import '@rneui/themed';
import { MaterialIcons } from '@expo/vector-icons';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from '@react-navigation/native';
import { TextStyle, ViewStyle, StyleProp } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { DateData } from 'react-native-calendars';
import { MarkedDates } from 'react-native-calendars/src/types';

export type RootStackParamList = {
  Root: NavigatorScreenParams<RootTabParamList> | undefined;
  Modal: undefined;
  NotFound: undefined;
  MeetingRoom: NavigatorScreenParams<RootTabParamList> | undefined;
  CreateMeeting: NavigatorScreenParams<RootTabParamList> | undefined;
  TestModal: NavigatorScreenParams<RootTabParamList> | undefined;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, Screen>;

export type RootTabParamList = {
  TabOne: undefined;
  TabTwo: undefined;
  TabThree: undefined;
};

export type RootTabScreenProps<Screen extends keyof RootTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<RootTabParamList, Screen>,
    NativeStackScreenProps<RootStackParamList>
  >;

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

  export interface TextProps {
    bold?: boolean;
  }

  export interface ComponentTheme {
    Text: Partial<TextProps>;
  }
}

// Code
export interface CodeInputProps {
  codeText: string;
  setCodeText: React.Dispatch<React.SetStateAction<string>>;
  style?: StyleProp<TextStyle>;
  showKeyboard: boolean;
}

// CardModal
export interface CardModalProps {
  isVisible: boolean;
  onClose: () => void;
}

export interface CardModalButtonProps {
  onClose: () => void;
}
/*
 *inputType
 */

export interface InputProps {
  inputProps: InputTextProps;
  style?: StyleProp<TextStyle>;
}

export interface InputFormProps {
  inputProps: InputTextProps;
}

export interface InputTextProps {
  label: string;
  placeholder: string;
  length: number;
  value: string;
  onChangeText: (enteredValue: string) => void;
  isMultiline?: boolean;
}

/*
 *PlaceCardProps
 TODO : 추후 문서보고 수정
 */

export type AddPlaceButtonProps = {
  navigation: RootStackScreenProps<'MeetingRoom'>;
  iconName: IconName;
  text: string;
};

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
  onPressHandler: (date: DateData) => void;
  markedDate: MarkedDates | undefined;
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

// SerchBar
export interface SerchBarProps {
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

// TabBar
export interface TabBarIconProps {
  color: string;
}

// StyledText
export interface TextProps {
  style?:
    | {
        color?: string;
        fontSize?: number;
        lineHeight?: number;
        fontWeight?: TextStyle['fontWeight'];
      }
    | StyleProp<TextStyle>;

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
