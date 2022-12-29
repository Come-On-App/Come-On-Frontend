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
import { TextStyle, ViewStyle } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootStackParamList = {
  Root: NavigatorScreenParams<RootTabParamList> | undefined;
  Modal: undefined;
  NotFound: undefined;
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
  }

  export interface TextProps {
    bold?: boolean;
  }

  export interface ComponentTheme {
    Text: Partial<TextProps>;
  }
}

// Icon
export type IconName = React.ComponentProps<typeof MaterialIcons>['name'];

export interface IconProps {
  name: IconName;
  color?: string;
  size: number;
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
  menuState: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
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
  style: {
    color: string;
    fontSize: number;
    lineHeight: number;
    fontWeight?: TextStyle['fontWeight'];
  };
  children: React.ReactNode;
}

// Code
export interface CodeInputProps {
  codeText: string;
  setCodeText: React.Dispatch<React.SetStateAction<string>>;
}
