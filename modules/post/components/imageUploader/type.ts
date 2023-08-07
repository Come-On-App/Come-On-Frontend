import { ImagePickerAsset } from 'expo-image-picker';

export type OnImage = (image: ImagePickerAsset) => void;

export interface IpostUploader {
  title: string;
  description: string;
  prevImage?: string;
  isDataLoading?: boolean;
  onImage: OnImage;
}
