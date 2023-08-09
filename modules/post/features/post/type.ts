import type { ImagePickerAsset } from 'expo-image-picker';
import { DateInfo } from '@shared/components/calendar/type';

export type DateRange = {
  startingDay: DateInfo;
  endingDay: DateInfo;
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
    startingDay: NonNullable<DateInfo>;
    endingDay: DateInfo;
  };
};
