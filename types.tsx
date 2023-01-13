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
  style?: StyleProp<ViewStyle>;
  onPress: () => void;
  icon: Icon;
}

// Icon
export type IconName = React.ComponentProps<typeof MaterialIcons>['name'];

export interface IconProps {
  name: IconName;
  color?: string;
  size: number;
  onPress?: () => void;
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
