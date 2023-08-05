import React, { useEffect } from 'react';
import * as ImagePicker from 'expo-image-picker';

import { ScreenTitle } from '@shared/components/font/Font';
import ImageUploader from '@shared/components/imageUploader/ImageUploader';
import ScreenLayout from '@shared/components/layout/ScreenLayout';
import DividerWrapper from '@shared/components/layout/DividerWrapper';
import ContentHeader from '@shared/components/layout/ContentHeader';
import useImagePicker from '@post/hooks/useImagePicker';

export interface IpostUploader {
  title: string;
  description: string;
  prevImage?: string;
  isDataLoading?: boolean;
  onImage: (image: ImagePicker.ImagePickerAsset) => void;
}

export default function PostImageUploader({
  title,
  description,
  prevImage,
  onImage,
  isDataLoading,
}: IpostUploader) {
  const [image, pickImage, isImageLoading] = useImagePicker();

  useEffect(() => {
    if (image) {
      onImage(image);
    }
  }, [image, onImage]);

  return (
    <DividerWrapper>
      <ScreenLayout>
        <ContentHeader>
          <ScreenTitle>{title}</ScreenTitle>
        </ContentHeader>
        <ImageUploader
          isLoading={isDataLoading || isImageLoading}
          uri={image?.uri ?? prevImage}
          description={description}
          onPress={pickImage}
        />
      </ScreenLayout>
    </DividerWrapper>
  );
}
