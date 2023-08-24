import React, { useEffect } from 'react';

import { ScreenTitle } from '@shared/components/font/Font';
import ImageUploader from '@shared/components/imageUploader/ImageUploader';
import ScreenLayout from '@shared/components/layout/ScreenLayout';
import DividerWrapper from '@shared/components/layout/DividerWrapper';
import ContentHeader from '@shared/components/layout/ContentHeader';
import useImagePicker from '@shared/hooks/useImagePicker';
import { withSelectionHaptic } from '@shared/utils/haptics';
import { IpostUploader } from './type';

export default function PostImageUploader({
  title,
  description,
  prevImage,
  onImage,
  isDataLoading,
}: IpostUploader) {
  const { image, pickImage } = useImagePicker();
  const [onPress] = withSelectionHaptic(pickImage);

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
          isLoading={isDataLoading}
          uri={image?.uri ?? prevImage}
          description={description}
          onPress={onPress}
        />
      </ScreenLayout>
    </DividerWrapper>
  );
}
