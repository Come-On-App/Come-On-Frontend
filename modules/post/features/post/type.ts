import type { DateData } from 'react-native-calendars';

import type { ImagePickerAsset } from 'expo-image-picker';

export type DateInfo = DateData;

export type DateRange = {
  startingDay: DateData | null;
  endingDay: DateData | null;
};

type Uri = string | null;

type Asset = ImagePickerAsset | null;

export type Image = {
  uri: Uri;
  asset: Asset;
};

export type Name = string | null;

export interface PostState {
  image: Image;
  name: Name;
  dateRange: DateRange;
}

export type ValidatedPostState = {
  image: {
    asset: ImagePickerAsset;
  };
  name: string;
  dateRange: {
    startingDay: DateData;
    endingDay: DateData | null;
  };
};
