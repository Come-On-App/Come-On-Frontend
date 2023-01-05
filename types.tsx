import '@rneui/themed';
import type { MaterialIcons } from '@expo/vector-icons';
import type { StyleProp, TextStyle, ViewStyle } from 'react-native';

import type { RootStackScreenProps } from './navigation';

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

// PlaceCard
export interface PlaceProps {
  data: {
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
}

export type AddPlaceButtonProps = {
  navigation: RootStackScreenProps<'MeetingRoom'>;
  iconName: IconName;
  text: string;
};

export interface IconButtonProps {
  style: StyleProp<ViewStyle>;
  onPress: () => void;
  icon: {
    iconName: IconName;
    size: number;
    color: string;
  };
}

// Icon
export type IconName = React.ComponentProps<typeof MaterialIcons>['name'];

export interface IconProps {
  name: IconName;
  color?: string;
  size: number;
  onPress?: () => void;
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
