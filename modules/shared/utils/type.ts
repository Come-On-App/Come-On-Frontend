import type { MeetingDateRange } from '@post/payload/postPayload';
import type { ImagePickerAsset } from 'expo-image-picker';

export interface IFormatDateRange {
  startFrom: string;
  endTo?: string;
}

export type IconvertStringToDateInfos =
  | {
      startFrom: string;
      endTo: string;
    }
  | undefined;

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

export interface IisMeetingDataValid {
  meetingImage: ImagePickerAsset | null;
  meetingName: string;
  meetingDateRange: MeetingDateRange;
}
