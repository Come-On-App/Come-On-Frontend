import { StyleProp, TextStyle } from 'react-native';

export interface IformatDateRange {
  startFrom: string;
  endTo?: string | null;
}

export type formatType = 'ko';

export type IapplyRelativeSizes = (
  sizes:
    | {
        [styleProps: string]: number;
      }
    | number[],
) => number[];

export type AssetState = {
  name: string;
  type: string;
  uri: string;
};

export interface IdayConfig {
  color: string | undefined;
  customTextStyle: StyleProp<TextStyle>;
}
