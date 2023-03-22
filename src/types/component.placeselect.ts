import type { CategoryKey, CategoryValue } from '@type/api.meeting';
import type { ButtonStyle } from '@type/component.button';
import type { StyleProp, ViewStyle } from 'react-native';
import type { PlaceSelect } from '@type/index';

export interface AddressProps {
  info: {
    title: string;
    category: CategoryKey | null;
  };
}

export interface AddressTitleProps {
  text: string;
}

export interface CategoryProps {
  category: CategoryKey | null;
}

export interface SubAddressProps {
  info: {
    title: string;
  };
}

export interface DescriptionProps {
  info: {
    text: string;
  };
}

export interface PlaceSelectButtonProps {
  text: string;
  onPress: () => void;
  isDisabled?: boolean;
  buttonStyle?: Partial<ButtonStyle> | Partial<ButtonStyle>[];
}

export interface PlaceSelectModalProps {
  isVisible: boolean;
  onClose: () => void;
}

export interface SearchTitleProps {
  style?: StyleProp<ViewStyle>;
}

export type Dispatch = (payload: PlaceSelect) => void;

export interface RelativeHeightProps {
  children: React.ReactNode;
}

export interface PlaceSelectModalBottomProps {
  onClose: () => void;
}

export interface CategoryDropdownItem {
  key: CategoryKey;
  value: CategoryValue;
}

export interface PlaceSelectBottomProps {
  onOpen: () => void;
}
